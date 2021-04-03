import React from "react"
import { Link } from "react-router-dom"
import { apiBaseUrl } from "../services/commonService"
import { getSentRequests, cancelFriendRequest, getUserSummary } from "../services/userService"

export default class SentRequests extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: false,
            requests: []
        }
        this.loadrequests()
    }

    loadrequests = () => {
        getSentRequests(response => {
            if(response.status) {
                const reqSenderIds = response.requests.map(sender => sender.userId)
                getUserSummary(reqSenderIds, userSummary => {
                    if(userSummary.status)
                    this.setState({requests: userSummary.users})
                })
            }
        })
    }

    removeRequestItem = requestItem => {
        const currentList = [...this.state.requests]
        currentList.splice(requestItem, 1)
        this.setState({
            requests: currentList
        })
    }

    handleRequest = requestItem => {
        cancelFriendRequest(requestItem._id, response => {
            console.log(response)
            if(response.status) {
                this.removeRequestItem(requestItem)
            }
        })
    }

    renderSentRequst = () => {
        if(this.state.requests.length) {
            return (
                this.state.requests.map(requestItem => {
                    return(
                        <div className="friend-rq-item" key={requestItem._id}>
                            <div className="friend-rq-item-thumb">
                                <img alt="alter text" src={apiBaseUrl + requestItem.profilePhoto} />
                            </div>
                            <div className="friend-rq-item-content">
                                <Link className="author-name" to={requestItem.username}>{requestItem.displayName}</Link>
                                <p className="mutual-f"><span className="mutual-amount">5</span> mutual friends</p>
                                <div className="rq-buttons">
                                    <span className="decline" onClick={() => this.handleRequest(requestItem)}>Cancel request</span>
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
                    No sent request found
                </div>
            )
        }
    }
    
    render() {
        return (
            <div className="common-block friend-request-section">
                <h4 className="block-header">Sent friend requests</h4>
                <div className="block-body friend-rq-items">
                    { this.renderSentRequst() }
                </div>
            </div>
        )
    }
}