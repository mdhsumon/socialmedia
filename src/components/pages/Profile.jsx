import React from "react"
import FriendRequests from "../FriendRequests"
import SentRequests from "../SentRequests"
import ProfileInfo from "../ProfileInfo"
import { Post } from "../post/Post"
import { Bio } from "../Bio"
import FriendLists from "../FriendLists"
import { loggedUserInfo } from "../../services/commonService"
import { screenSize } from "../../commonActions"

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bioData: ''
        }
    }

    updateBio = newData => {
        this.setState({
            bioData: newData
        })
    }

    render() {
        return(
            <div className="profile-secton">
                <div className="container">
                    <ProfileInfo userId={loggedUserInfo.id} updateBio={ this.updateBio } /> 
                </div>
                <div className="container column-section">
                    <div className="left-column">
                        <Bio bioData={ this.state.bioData } />
                        <FriendLists userId={loggedUserInfo.id} />
                    </div>
                    <div className="middle-column">
                        <Post userId={loggedUserInfo.id} />
                    </div>
                    {screenSize('width') > 900 && (
                        <div className="right-column">
                            <FriendRequests />
                            <SentRequests />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}