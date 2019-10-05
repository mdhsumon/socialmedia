import React from "react"
import { apiBaseUrl } from "../../services/commonService"
import { getFriendLists, getMultipleUserSummary } from "../../services/userService"

export class ChatBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userStatus: 'offline',
            chatUsers: []
        }
    }

    componentDidMount() {
        getFriendLists(response => {
            let friendIds = []
            for(let friend in response.friends) {
                friendIds[friend] = response.friends[friend].friendId
            }
            getMultipleUserSummary(friendIds, users => {
                this.setState({
                    chatUsers: users
                })
            })
        })
    }

    onlineStatus = () => {

    }

    render() {
        return(
            <div className="chat-bar">
                <div className="chat-user-container">
                    <div className="user-list">
                        {this.state.chatUsers.map(user => {
                            return(
                                <div className={`chat-user ${this.state.userStatus}`} key={user.userId}>
                                    <div className="display-name">{user.displayName}</div>
                                    <div className="user-thumb">
                                        <img src={apiBaseUrl + user.profilePhoto} alt={user.displayName} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="chatting-panel">
                        <div className="chat-box">
                            <div className="box-head">
                                <div className="user-photo"><img src={apiBaseUrl + '/file/global/image/male.png'} alt="sf"/></div>
                                <div className="display-name">Disaplay name</div>
                                <div className="action">
                                    <span className="close">x</span>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="message-cell self">
                                    <span className="message">Message here</span>
                                    <span className="action"><i className="icon-ellips-v"></i></span>
                                </div>
                                <div className="message-cell other">
                                    <span className="message">Message here</span>
                                </div>
                            </div>
                            <div className="box-form">
                                <div className="emoji">:)</div>
                                <div className="message-input">message input</div>
                                <button className="send">=></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}