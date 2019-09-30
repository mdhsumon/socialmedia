import React from "react"
import { Header } from "../Header"
import { ProfileInfo } from "../ProfileInfo"
import { Post } from "../global/post/Post"
import FriendRequests from "../global/FriendRequests"
import { Bio } from "../Bio"

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