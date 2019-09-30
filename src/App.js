import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Welcome } from "./components/pages/Welcome";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import { NewsFeed } from "./components/pages/NewsFeed";
import { Profile } from "./components/pages/Profile";
import PrivateRoute from "./PrivateRoute";

import "./resources/css/style.css";

class App extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Router>
        <Route path='/signup' exact component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Welcome} />
        <Route path='/profile' exact component={Profile} />
        <PrivateRoute path="/feeds" component={NewsFeed} />
      </Router>
    )
  }
}

export default App;
