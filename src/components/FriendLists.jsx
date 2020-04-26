import React from "react"
import { Link } from "react-router-dom"
import { apiBaseUrl } from "../services/commonService"
import { getFriendLists, getMultipleUserSummary } from "../services/userService"

export default class FriendLists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: false,
            friendLists: []
        }
        this.loadFriendLists()
    }

    loadFriendLists = () => {
        getFriendLists(response => {
            if(response.friends) {
                let friendIds = []
                for(let sender in response.friends) {
                    friendIds[sender] = response.friends[sender].friendId
                }
                getMultipleUserSummary(friendIds, userSummary => {
                    this.setState({friendLists: userSummary})
                })
            }
        })
    }

    renderFriednLists = () => {
        if(this.state.friendLists.length) {
            return (
                this.state.friendLists.map(requestItem => {
                    return(
                        <div className="friend-list-item" key={requestItem.userId}>
                            <div className="friend-list-thumb">
                                <Link className="author-name" to={requestItem.username}><img alt="alter text" src={apiBaseUrl + requestItem.profilePhoto} title={requestItem.displayName} /></Link>
                            </div>
                        </div>
                    )
                })
            )
        }
        else {
            return(
                <div className="no-rq-item">
                    No friends found
                </div>
            )
        }
    }
    
    render() {
        return (
            <div className="common-block friend-request-section">
                <h4 className="block-header">Your Friends</h4>
                <div className="friend-list-box">
                    {this.renderFriednLists()}
                </div>
            </div>
        )
    }
}