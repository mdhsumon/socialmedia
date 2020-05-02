import React from "react"
import { Post } from "../post/Post"
import { Bio } from "../Bio"
import FriendLists from "../FriendLists"
import { getUser } from "../../services/userService"
import { apiBaseUrl, loggedUserInfo } from "../../services/commonService"

export default class PublicProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.loadProfile(this.props.match.params.username)
    }

    loadProfile = username => {
        getUser(username, data => {
            if(data.user._id === loggedUserInfo.id) {
                window.location.href = '/profile'
            }
            else {
                if(data.status){
                    this.setState({
                        userId: data.user._id,
                        displayName: data.user.displayName,
                        nickName: data.user.nickName,
                        profilePhoto: data.user.profilePhoto,
                        coverPhoto: data.user.coverPhoto,
                        about: data.user.about
                    })
                }
            }
        })
    }

    render() {
        return(
            <div className="profile-secton">
                <div className="container">
                    <div className="profile-info-section">
                        <div className="cover-photo">
                            <img src={apiBaseUrl + this.state.coverPhoto} alt="Cover" />
                        </div>
                        <div className="profile-section">
                            <div className="profile-author">
                                <div className="profile-photo">
                                    <img src={apiBaseUrl + this.state.profilePhoto} alt={this.state.displayName} />
                                </div>
                                <div className="profile-name">
                                    <div className="author-name">{this.state.displayName}</div>
                                    { this.state.nickName && <div className="author-nick-name">{'(' + this.state.nickName + ')'}</div> }
                                </div>
                            </div>
                            <div className="public-user-action">
                                <button>Make friend</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container column-section">
                    <div className="left-column">
                        {this.state.userId && <Bio bioData={ this.state.about } />}
                    </div>
                    <div className="middle-column">
                        {this.state.userId && <Post userId={this.state.userId} />}
                    </div>
                    <div className="right-column">
                        {this.state.userId && <FriendLists userId={this.state.userId} />}
                    </div>
                </div>
            </div>
        )
    }
}