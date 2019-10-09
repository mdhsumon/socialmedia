import React from "react"
import update from "immutability-helper"
import { apiBaseUrl } from "../../services/commonService"
import { getFriendLists, getMultipleUserSummary } from "../../services/userService"
import { ChatBox } from "./ChatBox"
import { socketConnection } from "../../sockets/socket"

export class ChatBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chatUsers: [],
            openedChat: []
        }
    }

    componentDidMount() {
        getFriendLists(friendList => {
            let friendIds = []
            for(let friend in friendList.friends) {
                friendIds[friend] = friendList.friends[friend].friendId
            }
            getMultipleUserSummary(friendIds, users => {
                const userList = []
                for(let user in users) {
                    userList[user] = {
                        status: 'offline',
                        userId: users[user].userId,
                        username: users[user].username,
                        displayName: users[user].displayName,
                        profilePhoto: users[user].profilePhoto 
                    }
                }
                this.setState({
                    chatUsers: userList
                })
                
                // Receive user online status signal
                socketConnection.on('userOnlineStatus', userStatus => {
                    let copyUsers = [ ...this.state.chatUsers ]
                    const findUser = copyUsers.filter(item => item.userId === userStatus.userId)[0]
                    const userIndex = copyUsers.indexOf(findUser)
                    copyUsers = update(copyUsers[userIndex], { status: { $set: userStatus.status } })
                    this.setState({
                        //chatUsers: copyUsers
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