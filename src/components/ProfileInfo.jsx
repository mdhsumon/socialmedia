import React from "react"
import { Link } from "react-router-dom"
import { loggedUserInfo, apiBaseUrl } from "../services/commonService"
import Popup from "./common/Popup"

export default class ProfileInfo extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isPopup: false
        }
    }

    updateProfile = (event, updateType) => {
        switch(updateType) {
            case "profileInfo":
                this.setState({
                    isPopup: true,
                    popupClass: "popup-medium",
                    popupTitle: "Update Profile Information",
                    popupContent: (
                        <div className="profile-info-update">
                            <div className="input-box">
                                <input type="text" name="name" placeholder={ `Name` }/>
                            </div>
                            <div className="input-box">
                                <input type="text" name="nickName" placeholder={ `Nick Name` }/>
                            </div>
                        </div>
                    )
                })
            break

            case "profilePhoto":
                this.setState({
                    isPopup: true,
                    popupClass: "popup-rofile-photo",
                    popupTitle: "Change Profile Photo",
                    popupContent: (
                        <div className="profile-photo-update">
                            <div className="input-box input-file">
                                <input type="file" name="profilePhoto" />
                                <div className="input-file-text"><i className="icon-camera"></i> Upload Profile Photo</div>
                            </div>
                        </div>
                    )
                })
            break

            case "coverPhoto":
                this.setState({
                    isPopup: true,
                    popupClass: "popup-medium popup-cover-photo",
                    popupTitle: "Change Cover Photo",
                    popupContent: (
                        <div className="cover-photo-update">
                            <div className="input-box input-file">
                                <input type="file" name="profilePhoto" />
                                <div className="input-file-text"><i className="icon-camera"></i> Upload Profile Photo</div>
                            </div>
                        </div>
                    )
                })
            break
        }
    }

    render() {
        return (
            <React.Fragment>
                { this.state.isPopup && <Popup popTitle={ this.state.popupTitle } popContent={ this.state.popupContent } popClass={ this.state.popupClass } /> }
                <div className="profile-info-section">
                    <div className="cover-photo">
                        <img src={apiBaseUrl + '/file/global/image/cover.jpg'} alt="CoverPhoto" />
                        <div className="change-photo" title="Change Cover Photo" onClick={ e => this.updateProfile(e, "coverPhoto") }></div>
                    </div>
                    <div className="profile-section">
                        <div className="profile-author">
                            <div className="profile-photo">
                                <img src={apiBaseUrl + loggedUserInfo.userInfo.profilePhoto} alt={loggedUserInfo.userInfo.displayName} />
                                <div className="change-photo" title="Change Profile Photo" onClick={ e => this.updateProfile(e, "profilePhoto") }></div>
                            </div>
                            <div className="profile-name">
                                <div className="author-name">{loggedUserInfo.userInfo.displayName}</div>
                                { loggedUserInfo.userInfo.nickname && <div className="author-nick-name">{'(' + loggedUserInfo.userInfo.nickname + ')'}</div> }
                                <div className="update-info" onClick={ e => this.updateProfile(e, "profileInfo") }><i className="icon-writing"></i></div>
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
            </React.Fragment>
        )
    }
}