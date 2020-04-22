import React from "react"
import { loggedUserInfo, apiBaseUrl } from "../services/commonService"
import Popup from "./common/Popup"
import { getUserProfile } from "../services/userService"

export default class ProfileInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPopup: false
        }
    }

    userInfo = loggedUserInfo.userInfo
    popupClass = null
    popupTitle = null
    popupContent = null

    componentDidMount() {
        getUserProfile(data => {
            if(data)
            this.setState({
                currentProfile: data
            })
        })
    }

    previewPhoto = event => {
        this.setState({
            photo: URL.createObjectURL(event.target.files[0])
        })
    }

    handleForm = event => {
        if(event.target.name === 'profilePhoto') {
            this.previewPhoto(event)
        }
        const value = event.target.type === 'file' ? event.target.files : event.target.value
        this.setState({ [event.target.name]: value })
    }

    onClosePopup = () => {
        this.setState({ isPopup: false })
    }

    onSubmitPopup = () => {
        this.setState({ isPopup: false })
        console.log(this.state)
    }

    updateProfile = (event, updateType) => {
        switch(updateType) {
            case "profileInfo":
                this.setState({ isPopup: true })
                this.popupClass = "popup-medium"
                this.popupTitle = "Update Profile Information"
                this.popupContent = () => (
                    <div className="profile-info-update">
                        <div className="input-box-inline">
                            <div className="input-box">
                                <label>Full Name</label>
                                <div className="input"><input type="text" name="name" value={ this.state.currentProfile.displayName } onChange={ this.handleForm } /></div>
                            </div>
                            <div className="input-box">
                                <label>Nick Name</label>
                                <input type="text" name="nickName" value={ this.state.currentProfile.nickName } onChange={ this.handleForm } />
                            </div>
                        </div>
                        <div className="input-box">
                            <label>Location</label>
                            <div className="input"><input type="text" name="location" onChange={ this.handleForm } /></div>
                        </div>
                        <div className="input-box-inline">
                            <div className="input-box">
                                <label>Email</label>
                                <div className="input"><input type="text" name="email" value={ this.state.currentProfile.userEmail } onChange={ this.handleForm } /></div>
                            </div>
                            <div className="input-box">
                                <label>Phone</label>
                                <input type="text" name="phone" value={ this.state.currentProfile.userPhone } onChange={ this.handleForm } />
                            </div>
                        </div>
                        <div className="input-box">
                            <label>About Yourself</label>
                            <div className="input"><textarea type="text" name="about" onChange={ this.handleForm } >{ this.state.currentProfile.about }</textarea></div>
                        </div>
                    </div>
                )
            break

            case "profilePhoto":
                this.setState({ isPopup: true })
                this.popupClass = "popup-profile-photo"
                this.popupTitle = "Change Profile Photo"
                this.popupContent = () => (
                    <div className="profile-photo-update">
                        <div className="input-box input-file">
                            <input type="file" name="profilePhoto" onChange={ this.handleForm } />
                            <div className="input-file-text"><i className="icon-camera"></i> Upload Profile Photo</div>
                        </div>
                        <div className="preview-photo"><img src={ this.state.photo ? this.state.photo : apiBaseUrl + this.userInfo.profilePhoto } /></div>
                    </div>
                )
            break

            case "coverPhoto":
                this.setState({ isPopup: true })
                this.popupClass = "popup-medium popup-cover-photo"
                this.popupTitle = "Change Cover Photo"
                this.popupContent = () => (
                        <div className="cover-photo-update">
                            <div className="input-box input-file">
                                <input type="file" name="coverPhoto" onChange={ this.handleForm } />
                                <div className="input-file-text"><i className="icon-camera"></i> Upload Profile Photo</div>
                            </div>
                            <div className="preview-photo"><img src={ this.state.photo ? this.state.photo : apiBaseUrl + this.userInfo.coverPhoto } /></div>
                        </div>
                    )
            break
        }
    }

    render() {
        return (
            <React.Fragment>
                { this.state.isPopup && <Popup onClose={ this.onClosePopup } onSubmit={ this.onSubmitPopup } popTitle={ this.popupTitle } popContent={ () => this.popupContent() } popClass={ this.popupClass } /> }
                <div className="profile-info-section">
                    <div className="cover-photo">
                        <img src={apiBaseUrl + '/file/global/image/cover.jpg'} alt="Cover Photo" />
                        <div className="change-photo" title="Change Cover Photo" onClick={ e => this.updateProfile(e, "coverPhoto") }></div>
                    </div>
                    <div className="profile-section">
                        <div className="profile-author">
                            <div className="profile-photo">
                                <img src={apiBaseUrl + this.userInfo.profilePhoto} alt={this.userInfo.displayName} />
                                <div className="change-photo" title="Change Profile Photo" onClick={ e => this.updateProfile(e, "profilePhoto") }></div>
                            </div>
                            <div className="profile-name">
                                <div className="author-name">{this.userInfo.displayName}</div>
                                { this.userInfo.nickname && <div className="author-nick-name">{'(' + this.userInfo.nickname + ')'}</div> }
                                <div className="update-info" title="Update Profile Information" onClick={ e => this.updateProfile(e, "profileInfo") }><i className="icon-writing"></i></div>
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