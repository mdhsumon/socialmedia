import React from "react"
import { Link } from "react-router-dom"
import { loggedUserInfo, apiBaseUrl } from "../services/commonService"

export const ProfileInfo = () => {
    return (
        <div className="profile-info-section">
            <div className="cover-photo"><img src={apiBaseUrl + '/file/global/image/cover.png'} alt="CoverPhoto" /></div>
            <div className="profile-section">
                <div className="profile-author">
                    <div className="profile-photo">
                        <img src={apiBaseUrl + loggedUserInfo.userInfo.profilePhoto} alt={loggedUserInfo.userInfo.displayName} />
                    </div>
                    <div className="profile-name">
                        <Link className="author-name" to={loggedUserInfo.userInfo.username}>{loggedUserInfo.userInfo.displayName}</Link>
                        <p className="author-nick-name"><span className="n-name">{'(' + loggedUserInfo.userInfo.nickname + ')'}</span></p>
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