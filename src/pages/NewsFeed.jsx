import React from "react";
import { Post } from "../components/global/post/Post";
import FriendRequests from "../components/global/FriendRequests";

export default class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="body">
                <div className="container main-sections">
                    <Post />
                    <FriendRequests />
                </div>
            </div>
        )
    }
}