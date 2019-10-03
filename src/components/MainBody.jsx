import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { Welcome } from "./pages/Welcome"
import { NewsFeed } from "./pages/NewsFeed"
import { Profile } from "./pages/Profile"
import { PrivateRoute } from "../PrivateRoute"

export const MainBody = () => {
    return (
        <Router>
            <Route path='/signup' exact component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Welcome} />
            <Route exact path='/profile' component={Profile} />
            <PrivateRoute path="/feeds" component={NewsFeed} />
        </Router>
    )
}
