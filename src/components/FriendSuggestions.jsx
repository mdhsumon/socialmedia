import React from "react"
import { Link } from "react-router-dom"
import { apiBaseUrl, loggedUserInfo } from "../services/commonService"
import { getFriendSuggestions, getUserSummary, sendFriendRequest } from "../services/userService"
import { socketConnection } from "../sockets/socket"

export default class FriendSuggestions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: false,
            isRemoving: false,
            suggestions: []
        }
        this.getSuggestions()
    }

    getSuggestions = () => {
        getFriendSuggestions(response => {
            response.status && this.setState({suggestions: response.suggestions})
        })
    }

    sendRequest = userInfo => {
        sendFriendRequest(userInfo._id, response => {
            const currentList = [...this.state.suggestions]
            const findItem = currentList.indexOf(userInfo)
            if(response.status) {
                currentList.splice(findItem, 1)
                this.setState({
                    suggestions: currentList
                })
                // Broadcast request message
                socketConnection.emit("sendFriendRequest", loggedUserInfo.id, userInfo._id)
            }
        })
    }

    removeSuggestion = (userInfo, event) => {
        const currentList = [...this.state.suggestions]
        const findItem = currentList.indexOf(userInfo)
        if(findItem !== -1) {
            currentList.splice(findItem, 1)
            this.setState({
                suggestions: currentList
            })
        }
    }

    showMutual = users => {
        getUserSummary(users, response => {
        })
    }

    renderSuggestion = () => {
        if(this.state.suggestions.length){
            return (
                this.state.suggestions.map(userInfo => {
                    return(
                        <div className="friend-rq-item" key={userInfo._id}>
                            <div className="friend-rq-item-thumb">
                                <img alt={userInfo.displayName} src={apiBaseUrl + userInfo.profilePhoto} />
                            </div>
                            <div className="friend-rq-item-content">
                                <Link className="author-name" to={userInfo.username}>{userInfo.displayName}</Link>
                                {userInfo.mutualFriends.length > 0 &&
                                    <div className="mutual-f">
                                        <span className="mutual-count" onClick={() => {this.showMutual(userInfo.mutualFriends)}}>
                                            {userInfo.mutualFriends.length} mutual friend(s)
                                        </span>
                                    </div>
                                }
                                <div className="rq-buttons">
                                    <span className="accept" onClick={() => this.sendRequest(userInfo)}>Send Request</span>
                                    <span className="decline" onClick={() => this.removeSuggestion(userInfo)} title="Not interested">x</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
        else {
            return(
                <div className="no-rq-item">
                    No suggestion found
                </div>
            )
        }
    }

    render() {
        return (
            <div className="common-block friend-request-section">
                <h4 className="block-header">People you may know</h4>
                <div className="block-body friend-rq-items">
                    {this.renderSuggestion()}
                </div>
            </div>
        )
    }
}