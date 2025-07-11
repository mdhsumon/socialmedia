import React from "react"
import { Post } from "../post/Post"
import { WeatherForcast } from "../WeatherForcast"
import FriendRequests from "../FriendRequests"
import FriendSuggestion from "../FriendSuggestions"
import { loggedUserInfo } from "../../services/commonService"
import { screenSize } from "../../commonActions"

export const PostFeed = () => {
    return(
        <div className="news-feed-secton">
            <div className="container column-section">
                <div className="left-column">
                    <WeatherForcast />
                </div>
                <div className="middle-column">
                    <Post userId={loggedUserInfo.id} />
                </div>
                {screenSize('width') > 900 && (
                    <div className="right-column">
                        <FriendRequests />
                        <FriendSuggestion />
                    </div>
                )}
            </div>
        </div>
    )
}