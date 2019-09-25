import React from "react";
import { getFriendRequests, getMultipleUserSummary } from "../../services/userService";
import { Link } from "react-router-dom";

export default class FriendRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendRequests: []
        }
    }

    componentDidMount() {
        this.loadFriendRequests();
    }

    loadFriendRequests = () => {
        const userData = localStorage.getItem("userData") !== null ? JSON.parse(localStorage.getItem("userData")) : "";
        getFriendRequests(userData.userInfo.username, response => {
            let reqSenderId = [];
            for(let sender in response.friendRequests) {
                reqSenderId[sender] = response.friendRequests[sender].senderId;
            }
            getMultipleUserSummary(reqSenderId, response => {
                this.setState({friendRequests: response})
            });
        })
    }

    handleRequest = (userInfo, event) => {
        const currentList = [...this.state.suggestionList];
        const findIndex = currentList.indexOf(userInfo.userId);
        // if(findIndex !== -1) {
        //     currentList.splice(findIndex, 1);
        //     this.setState({
        //         suggestionList: currentList
        //     });
        // }
    }
    
    render() {
        return (
            <div className="common-block friend-request-section">
                <h4 className="block-header">Friend requests</h4>
                <div className="block-body friend-rq-items">
                    {this.state.friendRequests.map(requestItem => {
                        return(
                            <div className="friend-rq-item" key={requestItem.userId}>
                                <div className="friend-rq-item-thumb">
                                    <img alt="alter text" src={requestItem.profilePhoto} />
                                </div>
                                <div className="friend-rq-item-content">
                                    <Link className="author-name" to={`/${requestItem.username}`}>{requestItem.displayName}</Link>
                                    <p className="mutual-f"><span className="mutual-amount">5</span> mutual friends</p>
                                    <div className="rq-buttons">
                                        <button className="accept" onClick={this.handleRequest.bind(this, requestItem.userId)}>Accept</button>
                                        <button className="decline" onClick={this.handleRequest.bind(this, requestItem.userId)}>Decline</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}