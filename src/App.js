import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"; 
import {Signup} from "./pages/Signup";
import {Login} from "./pages/Login";
import {MainApp} from "./MainApp";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path='/signup' exact component={Signup} />
        <Route path='/login' exact component={Login} />
        <Route path='/' exact component={MainApp} />
      </Router>
    )
  }
}

export default App;
