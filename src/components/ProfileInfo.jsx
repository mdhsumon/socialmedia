import React from "react"
import { apiBaseUrl } from "../services/commonService"
import Popup from "./common/Popup"
import { getUserProfile, updateUserProfile } from "../services/userService"
import { MessagePopup } from "./common/MessagePopup"

export default class ProfileInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPopup: false,
            isMessagePopup: false
        }
        this.loadProfileData()
    }

    popupClass = null
    popupTitle = null
    popupContent = null

    loadProfileData = () => {
        getUserProfile(data => {
            if(data) {
                this.setState({
                    displayName: data.displayName,
                    nickName: data.nickName,
                    userEmail: data.userEmail,
                    userPhone: data.userPhone,
                    birthDate: data.birthDate,
                    location: data.location,
                    about: data.about,
                    profilePhoto: data.profilePhoto,
                    coverPhoto: data.coverPhoto
                })
                // Update bio from paren
                this.props.updateBio(this.state.about)
            }
        })
    }

    handleForm = event => {
        if(event.target.name === "profilePhoto" || event.target.name === "coverPhoto") {
            const newPhoto = event.target.name === "profilePhoto" ? "newProfile" : "newCover"
            this.setState({
                photo: URL.createObjectURL(event.target.files[0]),
                [newPhoto]: event.target.files
            })
        }
        else {
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    onClosePopup = () => {
        this.setState({ isPopup: false })
    }

    onSubmitPopup = () => {
        let newData = new FormData()
        this.state.displayName && newData.append('displayName', this.state.displayName)
        this.state.nickName && newData.append('nickName', this.state.nickName)
        this.state.userEmail && newData.append('userEmail', this.state.userEmail)
        this.state.userPhone && newData.append('userPhone', this.state.userPhone)
        this.state.birthDate && newData.append('birthDate', this.state.birthDate)
        this.state.location && newData.append('location', this.state.location)
        this.state.about && newData.append('about', this.state.about)
        this.state.newProfile && newData.append('newProfile', this.state.newProfile[0])
        this.state.newCover && newData.append('newCover', this.state.newCover[0])
        updateUserProfile(newData, status => {
            if(status) {
                this.setState({ isPopup: false })
                this.loadProfileData()
                this.setState({
                    isMessagePopup: true,
                    messagePopupText: "Your profile information has been updated."
                })
                setTimeout(() => {
                    this.setState({ isMessagePopup: false })
                }, 5000)
            }
            else {
                this.setState({ isMessagePopup: true, messagePopupText: "Something went wrong." })
            }
        })
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
                                <div className="input"><input type="text" name="displayName" value={ this.state.displayName } onChange={ this.handleForm } /></div>
                            </div>
                            <div className="input-box">
                                <label>Nick Name</label>
                                <input type="text" name="nickName" value={ this.state.nickName } onChange={ this.handleForm } />
                            </div>
                        </div>
                        <div className="input-box">
                            <label>Birth Date</label>
                            <div className="input"><input type="text" name="birthDate" value={ this.state.birthDate } onChange={ this.handleForm } placeholder="DD/MM/YYYY" /></div>
                        </div>
                        <div className="input-box">
                            <label>Location</label>
                            <div className="input"><input type="text" name="location" value={ this.state.location } onChange={ this.handleForm } /></div>
                        </div>
                        <div className="input-box-inline">
                            <div className="input-box">
                                <label>Email</label>
                                <div className="input"><input type="text" name="userEmail" value={ this.state.userEmail } onChange={ this.handleForm } /></div>
                            </div>
                            <div className="input-box">
                                <label>Phone</label>
                                <input type="text" name="userPhone" value={ this.state.userPhone } onChange={ this.handleForm } />
                            </div>
                        </div>
                        <div className="input-box">
                            <label>About Yourself</label>
                            <div className="input"><textarea type="text" name="about" onChange={ this.handleForm } value= { this.state.about } ></textarea></div>
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
                        <div className="preview-photo"><img src={ this.state.photo ? this.state.photo : apiBaseUrl + this.state.profilePhoto } alt="Preview Profile" /></div>
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
                        <div className="preview-photo"><img src={ this.state.photo ? this.state.photo : apiBaseUrl + this.state.coverPhoto } alt="Preview Cover" /></div>
                    </div>
                )
            break

            default:
        }
    }

    render() {
        return (
            <React.Fragment>
                { this.state.isMessagePopup && <MessagePopup message={ this.state.messagePopupText } status="success" /> }
                { this.state.isPopup && <Popup onClose={ this.onClosePopup } onSubmit={ this.onSubmitPopup } popTitle={ this.popupTitle } popContent={ () => this.popupContent() } popClass={ this.popupClass } /> }
                <div className="profile-info-section">
                    <div className="cover-photo">
                        <img src={apiBaseUrl + this.state.coverPhoto} alt="Cover" />
                        <div className="change-photo" title="Change Cover Photo" onClick={ e => this.updateProfile(e, "coverPhoto") }></div>
                    </div>
                    <div className="profile-section">
                        <div className="profile-author">
                            <div className="profile-photo">
                                <img src={apiBaseUrl + this.state.profilePhoto} alt={this.state.displayName} />
                                <div className="change-photo" title="Change Profile Photo" onClick={ e => this.updateProfile(e, "profilePhoto") }></div>
                            </div>
                            <div className="profile-name">
                                <div className="author-name">{this.state.displayName}</div>
                                { this.state.nickName && <div className="author-nick-name">{'(' + this.state.nickName + ')'}</div> }
                                <div className="update-info" title="Update Profile Information" onClick={ e => this.updateProfile(e, "profileInfo") }><i className="icon-writing"></i></div>
                            </div>
                        </div>
                        {/* <div className="profile-drop-downs">
                            <ul className="drop-downs">
                                <li className="active"><a href="/">Timeline</a></li>
                                <li><a href="/">Friends</a></li>
                                <li><a href="/">Photos</a></li>
                                <li><a href="/">Videos</a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}