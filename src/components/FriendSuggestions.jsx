import React from "react"
import { Link } from "react-router-dom"
import { apiBaseUrl } from "../services/commonService"
import { getFriendSuggestions, sendFriendRequest } from "../services/userService"

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

    sendRequest = (userInfo, event) => {
        sendFriendRequest(userInfo.username, response => {
            const currentList = [...this.state.suggestions]
            const findItem = currentList.indexOf(userInfo)
            if(response.requestStatus) {
                currentList.splice(findItem, 1)
                this.setState({
                    suggestions: currentList
                })
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
                                <p className="mutual-f"><span className="mutual-amount">5</span> mutual friends</p>
                                <div className="rq-buttons">
                                    <button className="accept" onClick={this.sendRequest.bind(this, userInfo)}>Send Request</button>
                                    <button className="decline" onClick={this.removeSuggestion.bind(this, userInfo)}>x</button>
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
                <h4 className="block-header">People You May Know</h4>
                <div className="block-body friend-rq-items">
                    {this.renderSuggestion()}
                </div>
            </div>
        )
    }
}