import React from "react"
import { Link } from "react-router-dom"
import { loggedUserInfo, apiBaseUrl } from "../services/commonService"

export const ProfileInfo = () => {
    return (
        <div className="profile-info-section">
            <div className="cover-photo">
                <img src={apiBaseUrl + '/file/global/image/cover.jpg'} alt="CoverPhoto" />
                <div className="change-photo" title="Change Cover Photo">
                    <input type="file" name="cover" />
                </div>
            </div>
            <div className="profile-section">
                <div className="profile-author">
                    <div className="profile-photo">
                        <img src={apiBaseUrl + loggedUserInfo.userInfo.profilePhoto} alt={loggedUserInfo.userInfo.displayName} />
                        <div className="change-photo" title="Change Profile Photo">
                            <input type="file" name="profile" />
                        </div>
                    </div>
                    <div className="profile-name">
                        <Link className="author-name" to={loggedUserInfo.userInfo.username}>{loggedUserInfo.userInfo.displayName}</Link>
                        <p className="author-nick-name"><span className="n-name">{'(' + loggedUserInfo.userInfo.nickname + ')'}</span></p>
                    </div>
                </div>
                <div className="profile-drop-downs">
                    <ul className="drop-downs">
                        <li className="active"><a href="/">Timeline</a></li>
                        <li><a href="/">Friends</a></li>
                        <li><a href="/">Photos</a></li>
                        <li><a href="/">Videos</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}