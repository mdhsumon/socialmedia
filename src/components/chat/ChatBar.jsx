import React from "react"
//import update from "immutability-helper"
import { apiBaseUrl, loggedUserInfo } from "../../services/commonService"
import { getFriendLists, getUserSummary } from "../../services/userService"
import { ChatBox } from "./ChatBox"
//import { socketConnection } from "../../sockets/socket"

export class ChatBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chatUsers: [],
            openedChat: []
        }
        this.loadFriendLists()
    }

    loadFriendLists = () => {
        getFriendLists(loggedUserInfo.id, data => {
            if(data.status) {
                const friendIds = data.friends.map(friend => friend.friendId)
                getUserSummary(friendIds, data => {
                    if(data.status) {
                        const userList = data.users.map(user => (
                            {
                                status: 'offline',
                                userId: user._id,
                                username: user.username,
                                displayName: user.displayName,
                                profilePhoto: user.profilePhoto 
                            }
                        ))
                        this.updateUsers(userList)
                    }
                })
            }
        })

        // Receive user online status signal
        // socketConnection.on('userOnlineStatus', userStatus => {
        //     let copyUsers = [ ...this.state.chatUsers ]
        //     const findUser = copyUsers.filter(item => item.userId === userStatus.userId)[0]
        //     const userIndex = copyUsers.indexOf(findUser)
        //     copyUsers = update(copyUsers[userIndex], { status: { $set: userStatus.status } })
        //     this.setState({
        //         chatUsers: copyUsers
        //     })
        // })
    }

    updateUsers = users => {
        this.setState({
            chatUsers: users
        })
    }

    openChat = (event, user) => {
        const isOpen = this.state.openedChat.filter(item => item.key === user.userId).length
        if(!isOpen)
        this.setState({
            openedChat: [<ChatBox
                key={ user.userId }
                userInfo={ user }
                closeChatBox={ this.closeChatBox }
                />, ...this.state.openedChat
            ]
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
                                <div key={user.userId} className={`chat-user ${user.status}`} onClick={ event => { this.openChat(event, user) } }>
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