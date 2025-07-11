import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Register } from "./components/pages/Register"
import { Login } from "./components/pages/Login"
import { Welcome } from "./components/pages/Welcome"
import { PrivateRoute } from "./PrivateRoute"
import { MainApp } from "./components/MainApp"
//import { ErrorPage } from "./components/pages/ErrorPage"
import "./resources/css/style.css"

export default class App extends React.Component {
  render() {
    return (
      <Router>
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/" component={ Welcome } />
          <PrivateRoute path={["/feeds", "/profile", "/user/:username"]} component={ MainApp } />
          {/* <Route path="*" component={ ErrorPage } /> */}
      </Router>
    )
  }
}
