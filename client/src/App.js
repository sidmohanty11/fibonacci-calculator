import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <img width="100px" src="/f.jpg" alt="logo" />
        <Route exact path="/">
          <Fib />
        </Route>
        <Route path="/otherpage">
          <OtherPage />
        </Route>
        </div>
      </Router>
    );
  }
}

export default App;
