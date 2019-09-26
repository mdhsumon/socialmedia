import React from "react";
import { sendFriendRequest } from "../../services/userService";
import { Link } from "react-router-dom";

export default class FriendSuggestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRemoving: false,
            suggestionList: [
                {username: 'ashik', userId: '5d8ccb7dc8d86f2204fbd568'},
                {username: 'delower', userId: '5d8ccbe0c8d86f2204fbd56b'}
            ]
        }
    }

    getFriendSuggestions = () => {
        
    }

    handleSuggestion = (userInfo, event) => {
        sendFriendRequest(userInfo.username, response => {
            const currentList = [...this.state.suggestionList];
            const findIndex = currentList.indexOf(userInfo.userId);
            if(response.requestStatus) {
                currentList.splice(findIndex, 1);
                this.setState({
                    suggestionList: currentList
                });
            }
        })
    }

    removeSuggestion = (userInfo, event) => {
        const currentList = [...this.state.suggestionList];
        const findItem = currentList.indexOf(userInfo);
        if(findItem !== -1) {
            currentList.splice(findItem, 1);
            this.setState({
                suggestionList: currentList
            });
        }
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
                                    <img alt="alter text" src={userInfo.profilePhoto} />
                                </div>
                                <div className="friend-rq-item-content">
                                    <Link className="author-name" to={userInfo.username}>{userInfo.username}</Link>
                                    <p className="mutual-f"><span className="mutual-amount">5</span> mutual friends</p>
                                    <div className="rq-buttons">
                                        <button className="accept" onClick={this.handleSuggestion.bind(this, userInfo)}>Send Request</button>
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