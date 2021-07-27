import { Component } from 'inferno';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'inferno-router';
import OtherPage from './OtherPage';
import Fib from './Fib';

class App extends Component {
  render() {
    return (
      <Router>
        <header>
          <Link to="/">Calc Fib</Link>
          <Link to="/otherpage">Visit another page</Link>
        </header>
        <Route exact path="/">
          <Fib />
        </Route>
        <Route path="/otherpage">
          <OtherPage />
        </Route>
      </Router>
    );
  }
}

export default App;
