import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Signup } from "./components/pages/Signup"
import { Login } from "./components/pages/Login"
import { Welcome } from "./components/pages/Welcome"
import { PrivateRoute } from "./PrivateRoute"
import { MainApp } from "./components/MainApp"

import "./resources/css/style.css"
import { ErrorPage } from "./components/pages/ErrorPage"

export default class App extends React.Component {
  render() {
    return (
      <Router>
          <Route exact path="/signup" component={ Signup } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/" component={ Welcome } />
          <PrivateRoute path={["/feeds", "/profile", "/user/:username"]} component={ MainApp } />
          {/* <Route path="*" component={ ErrorPage } /> */}
      </Router>
    )
  }
}
