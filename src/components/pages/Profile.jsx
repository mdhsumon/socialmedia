import React from "react"
import FriendRequests from "../FriendRequests"
import ProfileInfo from "../ProfileInfo"
import { Post } from "../post/Post"
import { Bio } from "../Bio"
import FriendLists from "../FriendLists"
import { loggedUserInfo } from "../../services/commonService"

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
                    </div>
                    <div className="middle-column">
                        <Post userId={loggedUserInfo.id} />
                    </div>
                    <div className="right-column">
                        <FriendLists userId={loggedUserInfo.id} />
                        <FriendRequests />
                    </div>
                </div>
            </div>
        )
    }
}