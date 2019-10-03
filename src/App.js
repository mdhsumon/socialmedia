import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { MainApp } from "./MainApp"

import "./resources/css/style.css";

export default class App extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Router>
        <MainApp />
      </Router>
    )
  }
}
