import React from "react"
import { loggedUserInfo, apiBaseUrl } from "../services/commonService"
import { socketConnection } from "../sockets/socket"
import { getUserSummary, userLogout } from "../services/userService"
import { screentSize } from "../commonActions"

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newFriend: false,
            newNoti: false,
            searchMenu: false,
            requestCount: 0,
            msgCount: 0,
            notiCount: 0,
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
        // Receive acceptance signal
        socketConnection.on('friendAccepted', acceptedId => {
            this.setState({
                newFriend: true,
                acceptCount: this.state.acceptCount + 1
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
                        <svg xmlns="http://www.w3.org/2000/svg" id="Group_39" data-name="Group 39" width="60" height="60" viewBox="0 0 60 60">
                            <path id="Path_7" data-name="Path 7" d="M0,0H60V60H0Z" fill="#8dd200"/>
                            <g id="Group_38" data-name="Group 38">
                                <g id="Ellipse_1" data-name="Ellipse 1" transform="translate(13.846 19.125) rotate(-30)" fill="none" stroke="#fff" strokeWidth="2">
                                <ellipse cx="8.579" cy="17.158" rx="8.579" ry="17.158" stroke="none"/>
                                <ellipse cx="8.579" cy="17.158" rx="7.579" ry="16.158" fill="none"/>
                                </g>
                                <g id="Ellipse_3" data-name="Ellipse 3" transform="translate(31.004 10.546) rotate(30)" fill="none" stroke="#fff" strokeWidth="2">
                                <ellipse cx="8.579" cy="17.158" rx="8.579" ry="17.158" stroke="none"/>
                                <ellipse cx="8.579" cy="17.158" rx="7.579" ry="16.158" fill="none"/>
                                </g>
                                <g id="Ellipse_2" data-name="Ellipse 2" transform="translate(47.012 21.115) rotate(90)" fill="none" stroke="#fff" strokeWidth="2">
                                <ellipse cx="8.579" cy="17.158" rx="8.579" ry="17.158" stroke="none"/>
                                <ellipse cx="8.579" cy="17.158" rx="7.579" ry="16.158" fill="none"/>
                                </g>
                            </g>
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
                                {this.state.newNoti && this.notificationCount(this.state.msgCount)}
                            </div>
                            <div className="dropdown-options message-list">
                                <div className="empty-option">No message</div>
                            </div>
                        </div>
                        <div className={`custom-dropdown notification-item friend-request ${this.state.friendMenu}`}>
                            <div className="notification-button" onClick={() => this.toggleMenu('friend')}>
                                <i className="icon-user-add"></i>
                                {this.state.newFriend && this.notificationCount(this.state.requestCount)}
                            </div>
                            <div className="dropdown-options request-list">
                                <div className="empty-option">No friend request</div>
                            </div>
                        </div>
                        <div className={`custom-dropdown notification-item notification ${this.state.notificationMenu}`}>
                            <div className="notification-button" onClick={() => this.toggleMenu('notification')}>
                                <i className="icon-bell"></i>
                                {this.state.newFriend && this.notificationCount(this.state.notiCount)}
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
                            <div className="option"><a href="/profile"><i className="icon-profile"></i> Profile Settings</a></div>
                            <div className="option"><i className="icon-cog"></i> Settings</div>
                            <div className="option" onClick={() => this.logout()}><i className="icon-switch"></i> Logout</div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}