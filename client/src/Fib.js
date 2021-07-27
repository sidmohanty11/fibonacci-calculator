import { Component } from 'inferno';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get("/values/current");
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get("/values/all");
        this.setState({ seenIndexes: seenIndexes.data });
    }

    async handleSubmit(e) {
        e.preventDefault();

        await axios.post("/values", {
            index: this.state.index,
        });
        this.setState({ index: '' });
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
            <div>
                For index {key} I calculated {this.state.values[key]}
            </div>
            )
        }

        return entries;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index: </label>
                    <input value={this.state.index} onChange={e => this.setState({ index: e.target.value })} />
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen: </h3>
                {this.renderSeenIndexes()}

                <h3>Calculated values: </h3>
                {this.renderValues()}
            </div>
        )
    }
}

export default Fib;
