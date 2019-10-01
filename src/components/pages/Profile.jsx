import React from "react"
import FriendRequests from "../global/FriendRequests"
import { Header } from "../Header"
import { ProfileInfo } from "../ProfileInfo"
import { Post } from "../global/post/Post"
import { Bio } from "../Bio"
import FriendLists from "../global/FriendLists"

export const Profile = () => {
    return(
        <div className="body">
            <Header />
            <div className="main-body profile-secton">
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
        </div>
    )
}