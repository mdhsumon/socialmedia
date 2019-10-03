import React from "react"
import FriendRequests from "../FriendRequests"
import { ProfileInfo } from "../ProfileInfo"
import { Post } from "../post/Post"
import { Bio } from "../Bio"
import FriendLists from "../FriendLists"

export const Profile = () => {
    return(
        <div className="profile-secton">
            <div className="container">
                <ProfileInfo /> 
            </div>
            <div className="container column-section">
                <div className="left-column">
                    <FriendLists />
                    <Bio />
                </div>
                <div className="middle-column">
                    <Post />
                </div>
                <div className="right-column">
                    <FriendRequests />
                </div>
            </div>
        </div>
    )
}