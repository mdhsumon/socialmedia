import React from "react";
import { isLoggedIn } from "./commonActions";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { NewsFeed } from "./pages/NewsFeed";
import { Profile } from "./pages/Profile";

import "./App.css";

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
        <Route path='/' exact component={NewsFeed} />
        <Route path='/profile' exact component={Profile} />
        {/* {this.state.isLogin ? <Redirect to='/' /> : <Redirect to='/login' />} */}
      </Router>
    )
  }
}

// class ProtectedRoute extends Component {
//   render() {
//     const { component: Component, ...props } = this.props

//     return (
//       <Route 
//         {...props} 
//         render={props => (
//           this.state.authenticated ?
//             <Component {...props} /> :
//             <Redirect to='/login' />
//         )} 
//       />
//     )
//   }
// }

// class AllRoutes extends Component {
//   render() {
//     return (
//       <Switch>
//         <Route path='/login' component={Login} />
//         <ProtectedRoute path='/welcome' component={Welcome} />
//       </Switch>
//     )
//   }
// }

export default App;
