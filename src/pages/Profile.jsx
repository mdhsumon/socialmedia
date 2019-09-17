import React from "react";
import { Header } from "../components/Header";
import { ProfileInfo } from "../components/ProfileInfo";
import { Post } from "../components/global/post/Post";
import FriendRequests from "../components/global/FriendRequests";
import { Bio } from "../components/Bio";

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