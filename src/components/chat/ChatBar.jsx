import React from "react"
import { apiBaseUrl } from "../../services/commonService"
import { getFriendLists, getMultipleUserSummary } from "../../services/userService"
import { ChatBox } from "./ChatBox"

export class ChatBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userStatus: 'online',
            chatUsers: [],
            openedChat: []
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

    openChat = (event, user) => {
        const isOpen = this.state.openedChat.filter(item => item.key === user.userId).length
        if(!isOpen)
        this.setState({
            openedChat: [<ChatBox key={ user.userId } userInfo={ user } closeChatBox={ this.closeChatBox } />, ...this.state.openedChat]
        })
    }

    closeChatBox = userId => {
        let currentOpened = [...this.state.openedChat]
        const targetBox = currentOpened.filter(item => item.key === userId)[0]
        currentOpened.splice(currentOpened.indexOf(targetBox), 1)
        this.setState({
            openedChat: currentOpened
        })
    }

    render() {
        return(
            <div className="chat-bar">
                <div className="chat-user-container">
                    <div className="user-list">
                        {this.state.chatUsers.map(user => {
                            return(
                                <div key={user.userId} className={`chat-user ${this.state.userStatus}`} onClick={ event => { this.openChat(event, user) } }>
                                    <div className="display-name">{user.displayName}</div>
                                    <div className="user-thumb">
                                        <img src={apiBaseUrl + user.profilePhoto} alt={user.displayName} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="chatting-panel">
                        {this.state.openedChat}
                    </div>
                </div>
            </div>
        )
    }
}