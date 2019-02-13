import React from 'react';
//import { DataProfile } from '../services/data-profile';
import profilePhoto from '../resources/users/id-1/profile-photo.jpg';
import coverPhoto from '../resources/users/id-1/cover-photo.jpg';

export const ProfileInfo = () => {
    return (
        <div className="profile-info-section">
            <div className="cover-photo"><img src={ coverPhoto } alt="CoverPhoto" /></div>
            <div className="profile-section">
                <div className="profile-author">
                    <a href="/" className="profile-photo">
                        <img alt="alter text"  src={ profilePhoto } />
                    </a>
                    <div className="profile-name">
                        <a className="author-name" href="/"><h4>kuddus boyati</h4></a>
                        <p className="author-nick-name">(<span className="n-name">pagla</span>)</p>
                    </div>
                </div>
                <div className="profile-drop-downs">
                    <ul className="drop-downs">
                        <li>
                            <a href="/">timeline</a>
                        </li>
                        <li>
                            <a href="/">about</a>
                        </li>
                        <li>
                            <a href="/">friends</a>
                        </li>
                        <li>
                            <a href="/">photos</a>
                        </li>
                        <li>
                            <a href="/">videos</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}