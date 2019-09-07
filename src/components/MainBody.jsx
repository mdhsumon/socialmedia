import React from 'react';
import { ProfileInfo } from './ProfileInfo';
import { Bio } from './Bio';
import Post from './global/post/Post';
import { FriendRequests } from './global/FriendRequests';
export const MainBody = () => {
    return (
        <div className="body">
            <div className="container">
                <ProfileInfo />
            </div>
            <div className="container main-sections">
                 <Bio />
                 <Post />
                 <FriendRequests />
            </div>
        </div>
    )
}