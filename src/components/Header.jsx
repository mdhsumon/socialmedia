import React from "react"
import { loggedUserInfo, apiBaseUrl } from "../services/commonService"
import { socketConnection } from "../sockets/socket"
import { getUserSummary, userLogout } from "../services/userService"
import { screentSize } from "../commonActions"

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newMsg: false,
            newFriend: false,
            newNoti: false,
            searchMenu: false,
            msgCount: 0,
            notiCount: 0,
            friendCount: 0,
            messageMenu: 'hide',
            friendMenu: 'hide',
            notificationMenu: 'hide',
            profileMenu: 'hide'
        }
        getUserSummary(loggedUserInfo.id, summary => {
            const user = summary.users[0]
            if(summary.status)
            this.setState({
                displayName: user.displayName,
                username: user.displayName,
                nickName: user.nickName,
                profilePhoto: user.profilePhoto
            })
        })
        // Receive request signal
        socketConnection.on('getFriendRequest', fromUser => {
            this.setState({
                newFriend: true,
                friendCount: this.state.friendCount + 1
            })
        })
        // Receive request accepted signal
        socketConnection.on('friendAccepted', userId => {
            this.setState({
                newFriend: true,
                friendCount: this.state.friendCount + 1
            })
        })
        // Receive message notification
        socketConnection.on('receiveMessage', () => {
            this.setState({
                newNoti: true,
                msgCount: this.state.msgCount + 1
            })
        })
    }

    // Toggle profile menu
    toggleMenu = target => {
        this.setState({newNoti: false})
        switch(target) {
            case 'message':
                this.setState({messageMenu: this.state.messageMenu === 'hide' ? 'show' : 'hide'})
                break
            case 'friend':
                this.setState({friendMenu: this.state.friendMenu === 'hide' ? 'show' : 'hide'})
                break
            case 'notification':
                this.setState({notificationMenu: this.state.notificationMenu === 'hide' ? 'show' : 'hide'})
                break
            case 'profile':
                this.setState({profileMenu: this.state.profileMenu === 'hide' ? 'show' : 'hide'})
                break
            default:
        }
    }

    logout = () => {
        userLogout(response => {
            if(response.status) {
                localStorage.removeItem('data')
                window.location.href = '/'
            }
        })
    }

    notificationCount = count => (
        count && (
            <span className="notification-count">
                {count > 99 ? '99+' : count}
            </span>
        )
    )

    render() {
        return (
            <header className="header">
                <div className="header-container">
                    <div className="logo-bar">
                    <svg xmlns="http://www.w3.org/2000/svg" id="connect" data-name="connect" viewBox="0 0 512 456.81" width="40" height="40" fill="#6ebd52">
                        <path d="M462,179.21h0a50.12,50.12,0,0,0-47.73,35H381a126,126,0,0,0-49.53-85.71l16.65-28.84a50.12,50.12,0,1,0-26-15l-16.64,28.82a125.88,125.88,0,0,0-99,0L189.85,84.67a50,50,0,1,0-26,15l16.66,28.84A125.93,125.93,0,0,0,131,214.24H97.76a50,50,0,1,0,0,30H131A125.94,125.94,0,0,0,180.53,330l-16.65,28.84a50.12,50.12,0,1,0,26,15L206.49,345a125.83,125.83,0,0,0,99,0l16.64,28.82a50,50,0,1,0,26-15L331.46,330A125.91,125.91,0,0,0,381,244.24h33.24a50,50,0,1,0,47.73-65ZM286.36,168.79a22.5,22.5,0,1,1-22.5,22.5A22.5,22.5,0,0,1,286.36,168.79Zm-66.11,0a22.5,22.5,0,1,1-22.5,22.5A22.5,22.5,0,0,1,220.25,168.79Zm96.37,89.55A81.7,81.7,0,0,1,307,272.83c-13.15,15.71-30.79,24-51,24s-38-8.24-51.88-23.84a86.82,86.82,0,0,1-10.37-14.51A8.72,8.72,0,0,1,198.26,246h0a8.71,8.71,0,0,1,10.62,3.87,70.1,70.1,0,0,0,8.63,12C228,273.52,241,279.43,256,279.43s27.45-5.84,37.27-17.35a63.5,63.5,0,0,0,7.9-11.75A8.74,8.74,0,0,1,311.59,246h0A8.71,8.71,0,0,1,316.62,258.34Z" transform="translate(0 -0.84)"/>
                    </svg>
                    </div>
                    <div className={`search-bar${screentSize('width') < 520 ? ' has-search-menu' : ''}`}>
                        {screentSize('width') < 520 && <span className="search-menu" onClick={()=> {this.setState({searchMenu: !this.state.searchMenu})}}>
                            <i className="icon-search"></i>
                        </span>}
                        <div className="search-form" style={screentSize('width') < 520 && !this.state.searchMenu ? {display: 'none'} : {}}>
                            <input className="search" type="search" title="Search" placeholder="Search"/>
                            <button className="search-button">
                                <i className="icon-search"></i>
                            </button>
                        </div>
                        <div className="search-result">
                            
                        </div>
                    </div>
                    <div className="notification-bar">
                        <div className={`custom-dropdown notification-item message active ${this.state.messageMenu}`}>
                            <div className="notification-button" onClick={() => this.toggleMenu('message')}>
                                <i className="icon-text-bubble"></i>
                                {this.state.newMsg && this.notificationCount(this.state.msgCount)}
                            </div>
                            <div className="dropdown-options message-list">
                                <div className="empty-option">No message</div>
                            </div>
                        </div>
                        <div className={`custom-dropdown notification-item friend-request ${this.state.friendMenu}`}>
                            <div className="notification-button" onClick={() => this.toggleMenu('friend')}>
                                <i className="icon-user-add"></i>
                                {this.state.newFriend && this.notificationCount(this.state.friendCount)}
                            </div>
                            <div className="dropdown-options request-list">
                                <div className="empty-option">No friend request</div>
                            </div>
                        </div>
                        <div className={`custom-dropdown notification-item notification ${this.state.notificationMenu}`}>
                            <div className="notification-button" onClick={() => this.toggleMenu('notification')}>
                                <i className="icon-bell"></i>
                                {this.state.newNoti && this.notificationCount(this.state.notiCount)}
                            </div>
                            <div className="dropdown-options notification-list">
                                <div className="empty-option">No notification</div>
                            </div>
                        </div>
                    </div>
                    <div className={`custom-dropdown user-bar ${this.state.profileMenu}`}>
                        <div className="user-photo" onClick={() => this.toggleMenu('profile')}>
                            <img src={apiBaseUrl + this.state.profilePhoto} alt={this.state.displayName} />
                        </div>
                        {screentSize('width') > 767 && <div className="user-name">
                            <div className="name">{this.state.displayName}</div>
                            <div className="nickname">{this.state.nickName}</div>
                        </div>}
                        <div className="dropdown-options">
                            <div className="option"><a href="/feeds"><i className="icon-feeds"></i> Post Feeds</a></div>
                            <div className="option"><a href="/profile"><i className="icon-profile"></i> Profile</a></div>
                            <div className="option"><a href="/photos"><i className="icon-images"></i> Photos</a></div>
                            <div className="option"><a href="/videos"><i className="icon-film"></i> Videos</a></div>
                            <div className="option"><i className="icon-cog"></i> Settings</div>
                            <div className="option" onClick={() => this.logout()}><i className="icon-switch"></i> Logout</div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}