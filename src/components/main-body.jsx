import React from 'react';
import { ProfileInfo } from '../components/profile-info';
import { Bio } from '../components/bio';
import Post from '../components/global/post';
import { FriendRequests } from '../components/global/friend-requests';
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