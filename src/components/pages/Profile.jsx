import React from "react"
import FriendRequests from "../FriendRequests"
import ProfileInfo from "../ProfileInfo"
import { Post } from "../post/Post"
import { Bio } from "../Bio"
import FriendLists from "../FriendLists"

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
                    <ProfileInfo updateBio={ this.updateBio } /> 
                </div>
                <div className="container column-section">
                    <div className="left-column">
                        <Bio bioData={ this.state.bioData } />
                    </div>
                    <div className="middle-column">
                        <Post />
                    </div>
                    <div className="right-column">
                        <FriendLists />
                        <FriendRequests />
                    </div>
                </div>
            </div>
        )
    }
}