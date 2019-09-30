import React from "react"
import { Header } from "../Header"
import { Post } from "../global/post/Post"
import FriendRequests from "../global/FriendRequests"
import { WeatherForcast } from "../WeatherForcast"
import { Bio } from "../Bio"
import FriendSuggestion from "../global/FriendSuggestion"

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