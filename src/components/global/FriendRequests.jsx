import React from "react";
import { getFriendRequests, getMultipleUserSummary } from "../../services/userService";

export default class FriendRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendRequests: []
        }
    }

    componentDidMount() {
        this.FriendRequests();
    }

    FriendRequests = () => {
        const userData = localStorage.getItem("userData") !== null ? JSON.parse(localStorage.getItem("userData")) : "";
        getFriendRequests(userData.userInfo.username, response => {
            //this.setState({friendRequests: response.friendRequests})
            getMultipleUserSummary();
            console.log(response)
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
                    {this.state.friendRequests.map((requestItem, key) => {
                        return(
                            <div className="friend-rq-item" key={requestItem.senderId}>
                                <div className="friend-rq-item-thumb">
                                    <img alt="alter text" src="http://localhost:2000/file/global/image/female.png" />
                                </div>
                                <div className="friend-rq-item-content">
                                    <a className="author-name" href="/">komola banu</a>
                                    <p className="mutual-f"><span className="mutual-amount">5</span> mutual friends</p>
                                    <div className="rq-buttons">
                                        <button className="accept" onClick={this.handleRequest.bind(this, requestItem.senderId)}>Accept</button>
                                        <button className="decline" onClick={this.handleRequest.bind(this, requestItem.senderId)}>Decline</button>
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