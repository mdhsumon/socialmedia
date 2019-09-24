import React from "react";
import { Header } from "../components/Header";
import { Post } from "../components/global/post/Post";
import FriendRequests from "../components/global/FriendRequests";
import { WeatherForcast } from "../components/WeatherForcast";
import { Bio } from "../components/Bio";
import FriendSuggestion from "../components/global/FriendSuggestion";

export const NewsFeed = () => {
    return(
        <div className="body">
            <Header />
            <div className="main-body news-feed-secton">
                <div className="container column-section">
                    <div className="left-column">
                        <WeatherForcast />
                        <Bio />
                    </div>
                    <div className="middle-column">
                        <Post />
                    </div>
                    <div className="right-column">
                        <FriendRequests />
                        <FriendSuggestion />
                    </div>
                </div>
            </div>
        </div>
    )
}