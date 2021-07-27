const keys = require("./keys");
// express app setup
const express = require("express");
const { json } = require("express");
const cors = require("cors");

// initialization of express app
const app = express();

// middlewares
app.use(cors());
app.use(json());

// postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on("error", () => console.error("Lost PG connection."));

pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.error(err));

// redis client setup
const redis = require("redis");
const redisClient = redis.createClient({
    host:keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

// route handlers
app.get("/", (req, res) => {
    res.send("hi");
});

app.get("/values/all", async (req, res) => {
    const values = await pgClient.query("SELECT * FROM values");
    res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
    redisClient.hgetall("values", (err, values) => {
        res.send(values);
    });
});

app.post("/values", async (req, res) => {
    const index = req.body.index;
    if (parseInt(index) > 40) {
        return res.status(422).send("index too high, i'm too lazy to work that much");
    }

    redisClient.hset("values", index, "Nothing yet!");
    redisPublisher.publish("insert", index);

    pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

    res.send({ working: true });
});

// listening route
app.listen(8000, err => {
    console.log("listening at port, ", 8000);
})