import React from "react"
import { apiBaseUrl, loggedUserInfo } from "../../services/commonService"
import { getFriendLists, getUserSummary } from "../../services/userService"
import { ChatBox } from "./ChatBox"
import { socketConnection } from "../../sockets/socket"
import { screenSize } from "../../commonActions"

export class ChatBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chatList: false,
            chatUsers: [],
            openedChat: []
        }
    }

    componentDidMount() {
        this.loadFriendLists(() => {
            // Receive user online status
            socketConnection.on('userOnlineStatus', userId => {
                this.updateUserStatus(userId, 'online')
            })
            // Receive user offline status
            socketConnection.on('userOfflineStatus', userId => {
                this.updateUserStatus(userId, 'offline')
            })
        })
    }

    updateUserStatus = (userId, status) => {
        const newChatUsers = this.state.chatUsers.map(user => (
            user.userId === userId ?
            {status: status,
            userId: user.userId,
            username: user.username,
            displayName: user.displayName,
            profilePhoto: user.profilePhoto} :
            user
        ))
        this.updateUsers(newChatUsers)
    }

    loadFriendLists = callback => {
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
                        callback()
                    }
                })
            }
        })
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

    chatMenu = () => {
        this.setState({chatList: !this.state.chatList}, () => {
            if(this.state.chatList){
                document.addEventListener('click', e => {
                    !this.userListRef.contains(e.target) && !this.chatMenuRef.contains(e.target) && this.setState({chatList: false})
                })
            }
        })
    }

    closeChatBox = userId => {
        let currentOpened = [...this.state.openedChat]
        currentOpened = currentOpened.filter(item => item.key !== userId)
        this.setState({
            openedChat: currentOpened
        }) 
    }

    render() {
        return(
            <div className={`chat-bar${this.state.openedChat.length ? ' active-chat' : ''}${this.state.chatList ? ' show' : ''}`}>
                <div className="user-list" ref={r => this.userListRef = r}>
                    {this.state.chatUsers.map(user => {
                        return(
                            <div key={user.userId} className={`chat-user ${user.status}`} onClick={ event => { this.openChat(event, user) } }>
                                <div className="user-thumb">
                                    <img src={apiBaseUrl + user.profilePhoto} alt={user.displayName} />
                                </div>
                                <div className="display-name">{user.displayName}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="chatting-panel">
                    {this.state.openedChat}
                </div>
                {screenSize('width') < 560 && (
                    <span className="chat-menu" onClick={() => this.chatMenu()} ref={r => this.chatMenuRef = r}><i className="icon-bubbles"></i></span>
                )}
            </div>
        )
    }
}