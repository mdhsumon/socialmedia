import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Signup } from "./components/pages/Signup"
import { Login } from "./components/pages/Login"
import { Welcome } from "./components/pages/Welcome"
import { PrivateRoute } from "./PrivateRoute"
import { MainBody } from "./components/MainBody"

import "./resources/css/style.css"

export default class App extends React.Component {
  render() {
    return (
      <Router>
          <Route exact path="/signup" component={ Signup } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/" component={ Welcome } />
          <PrivateRoute exact path="/feeds" component={ MainBody } />
      </Router>
    )
  }
}
