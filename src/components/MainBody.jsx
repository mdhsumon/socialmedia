import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NewsFeed } from "../pages/NewsFeed";
import { Profile } from "../pages/Profile";

export const MainBody = () => {
    return (
        <React.Fragment>
            <Route exact path="/feed" component={NewsFeed} />
            <Route exact path="/profile" component={Profile} />
        </React.Fragment>
    )
}
