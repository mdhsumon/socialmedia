import React from "react"
import { apiBaseUrl } from "../../services/commonService"
import { getFriendLists, getMultipleUserSummary } from "../../services/userService"
import { ChatBox } from "./ChatBox"

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

    openChat = event => {
        return <ChatBox />
    }

    render() {
        return(
            <div className="chat-bar">
                <div className="chat-user-container">
                    <div className="user-list">
                        {this.state.chatUsers.map(user => {
                            return(
                                <div className={`chat-user ${this.state.userStatus}`} key={user.userId} onClick={this.openChat.bind(this)}>
                                    <div className="display-name">{user.displayName}</div>
                                    <div className="user-thumb">
                                        <img src={apiBaseUrl + user.profilePhoto} alt={user.displayName} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="chatting-panel">
                        {this.openChat()}
                    </div>
                </div>
            </div>
        )
    }
}