import React from "react";
import { sendFriendRequest } from "../../services/userService";
import { Link } from "react-router-dom";

export default class FriendSuggestion extends React.Component {
    constructor(props) {
        super(props);

        this.handleFriendRequest = this.handleFriendRequest.bind(this);
        //this.removeSuggestion = this.removeSuggestion.bind(this);

        this.state = {
            suggestionList: [
                {username: 'komola', userId: '5d88ac8eb0010e3b60b5add9'},
                {username: 'kuddus', userId: '5d88ad3cb0010e3b60b5addb'},
                {username: 'new-user', userId: '5d7f4ba05178091b34849767'},
                {username: 'testtest', userId: '5d7f2ffed1d08033fc93f27f'}
            ]
        }
    }

    handleFriendRequest = (userInfo, event) => {
        console.log(userInfo.userId, event)
        const currentList = [...this.state.suggestionList];
        const findIndex = currentList.indexOf(userInfo.userId);
        // if(findIndex !== -1) {
        //     currentList.splice(findIndex, 1);
        //     this.setState({
        //         suggestionList: currentList
        //     });
        // }
        sendFriendRequest(userInfo.username, userInfo.userId, response => {
            
        })
    }

    removeSuggestion = (userInfo, event) => {
        // const currentList = [...this.state.suggestionList];
        // const findIndex = currentList.indexOf(userInfo.userId);
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
                <h4 className="block-header">People You May Know</h4>
                <div className="block-body friend-rq-items">
                    {this.state.suggestionList.map(userInfo => {
                        return(
                            <div className="friend-rq-item" key={userInfo.userId}>
                                <div className="friend-rq-item-thumb">
                                    <img alt="alter text" src="http://localhost:2000/file/global/image/female.png" />
                                </div>
                                <div className="friend-rq-item-content">
                                    <Link className="author-name" to={userInfo.username}>{userInfo.username}</Link>
                                    <p className="mutual-f"><span className="mutual-amount">5</span> mutual friends</p>
                                    <div className="rq-buttons">
                                        <button className="accept" onClick={this.handleFriendRequest.bind(this, userInfo)}>Send Request</button>
                                        <button className="decline" onClick={this.removeSuggestion.bind(this, userInfo)}>x</button>
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