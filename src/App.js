import React from "react";
import {isLoggedIn} from "./commonActions";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {Signup} from "./pages/Signup";
import {Login} from "./pages/Login";
import {MainApp} from "./MainApp";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: isLoggedIn()
    }
  }
  
  render() {
    return (
      <Router>
        <Route path='/signup' exact component={Signup} />
        <Route path='/login' exact component={Login} />
        <Route path='/' exact component={MainApp} />
        {this.state.isLogin ? <Redirect to='/' /> : <Redirect to='/login' />}
      </Router>
    )
  }
}

export default App;
