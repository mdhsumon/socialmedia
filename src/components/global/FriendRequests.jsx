import React from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../../services/commonService";
import { getFriendRequests, getMultipleUserSummary, acceptFriendRequest, declineFriendRequest } from "../../services/userService";

export default class FriendRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmpty: false,
            friendRequests: []
        }
    }

    componentDidMount() {
        this.loadFriendRequests();
    }

    loadFriendRequests = () => {
        getFriendRequests(response => {
            let reqSenderId = [];
            for(let sender in response.friendRequests) {
                reqSenderId[sender] = response.friendRequests[sender].senderId;
            }
            getMultipleUserSummary(reqSenderId, response => {
                this.setState({friendRequests: response})
            });
        })
    }

    removeRequestItem = requestItem => {
        const currentList = [...this.state.friendRequests];
        currentList.splice(requestItem, 1);
        this.setState({
            friendRequests: currentList
        });
    }

    handleRequest = (requestItem, requstType, event) => {
        if(requstType === 'accept') {
            acceptFriendRequest(requestItem.userId, response => {
                if(response.acceptStatus) {
                    this.removeRequestItem(requestItem)
                }
            })
        }
        else if(requstType === 'decline') {
            declineFriendRequest(requestItem.userId, response => {
                if(response.declineStatus) {
                    this.removeRequestItem(requestItem)
                }
            })
        }
    }

    renderFriednRequst = () => {
        if(this.state.friendRequests.length) {
            return (
                this.state.friendRequests.map(requestItem => {
                    return(
                        <div className="friend-rq-item" key={requestItem.userId}>
                            <div className="friend-rq-item-thumb">
                                <img alt="alter text" src={apiBaseUrl + requestItem.profilePhoto} />
                            </div>
                            <div className="friend-rq-item-content">
                                <Link className="author-name" to={requestItem.username}>{requestItem.displayName}</Link>
                                <p className="mutual-f"><span className="mutual-amount">5</span> mutual friends</p>
                                <div className="rq-buttons">
                                    <button className="accept" onClick={this.handleRequest.bind(this, requestItem, 'accept')}>Accept</button>
                                    <button className="decline" onClick={this.handleRequest.bind(this, requestItem, 'decline')}>Decline</button>
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
                    No friend request found
                </div>
            )
        }
    }
    
    render() {
        return (
            <div className="common-block friend-request-section">
                <h4 className="block-header">Friend requests</h4>
                <div className="block-body friend-rq-items">
                    {this.renderFriednRequst()}
                </div>
            </div>
        )
    }
}