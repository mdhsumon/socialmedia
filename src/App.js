import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"; 
import {Login} from "./pages/login";
import MainApp from "./mainApp";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/login' exact component={Login} />
        <Route path='/' exact component={MainApp} />
      </Router>
    )
  }
}

export default App;
