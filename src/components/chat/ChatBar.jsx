import React from "react"
import { apiBaseUrl } from "../../services/commonService"
import { getFriendLists, getMultipleUserSummary } from "../../services/userService"
import { ChatBox } from "./ChatBox"
import { socketConnection } from "../../socket"

export class ChatBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
                const chatUsers = []
                for(let user in users) {
                    chatUsers[user] = {
                        state: 'offline',
                        userId: users[user].userId,
                        username: users[user].username,
                        displayName: users[user].displayName,
                        profilePhoto: users[user].profilePhoto 
                    }
                }
                this.setState({
                    chatUsers: chatUsers
                })

                // Receive user online status signal
                socketConnection.on('frinedOnline', response => {
                    let copyUsers = [ ...this.state.chatUsers ]
                    const foundUser = copyUsers.filter(item => item.userId === response.userId)
                    const userIndex = copyUsers.indexOf(foundUser)
                    copyUsers[userIndex] = {
                        state: response.state
                    }
                    console.log(copyUsers)
                    this.setState({
                        chatUsers: copyUsers
                    })
                })
            })
        })
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
                                <div key={user.userId} className={`chat-user ${this.state.onlineStatus}`} onClick={ event => { this.openChat(event, user) } }>
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