import React from "react"
import { loggedUserInfo, apiBaseUrl } from "../services/commonService"
import { socketConnection } from "../sockets/socket"

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newFriend: false,
            acceptCount: 0,
            newNoti: false,
            msgCount: 0,
            profileMenu: 'hide'
        }
        // Receive acceptance signal
        socketConnection.on('friendAccepted', acceptedId => {
            this.setState({
                newFriend: true,
                acceptCount: this.state.acceptCount + 1
            })
        })
        // Receive message notification
        socketConnection.on('sendMessage', () => {
            this.setState({
                newNoti: true,
                msgCount: this.state.msgCount + 1
            })
        })
    }

    // Toggle profile menu
    toggleProfileMenu = event => {
        const menuClass = this.state.profileMenu == 'hide' ? 'show' : 'hide'
        this.setState({profileMenu: menuClass})
    }

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
                    <div className="search-bar">
                        <div className="search-form">
                            <input className="search" type="search" title="Search" placeholder="Search"/>
                            <button className="search-button">
                                <i className="icon-search"></i>
                            </button>
                        </div>
                        <div className="search-result">
                            
                        </div>
                    </div>
                    <div className="notification-bar">
                        <div className="notification-item message active">
                            <div className="notification-button">
                                <i className="icon-text-bubble"></i>
                                {this.state.newNoti && (
                                    <span className="notification-count">{this.state.msgCount}</span>
                                )}
                            </div>
                            <div className="message-list">

                            </div>
                        </div>
                        <div className="notification-item friend-request">
                            <div className="notification-button">
                                <i className="icon-user-add"></i>
                                {this.state.newFriend && (
                                    <span className="notification-count">{this.state.acceptCount}</span>
                                )}
                            </div>
                            <div className="friend-request-list">
    
                            </div>
                        </div>
                        <div className="notification-item notification">
                            <div className="notification-button"><i className="icon-bell"></i></div>
                            <div className="notification-list">
    
                            </div>
                        </div>
                    </div>
                    <div className={`user-bar ${this.state.profileMenu}`}>
                        <div className="user-photo" onClick={(eve) => {this.toggleProfileMenu(eve)}}>
                            <img src={apiBaseUrl + loggedUserInfo.userInfo.profilePhoto} alt={loggedUserInfo.userInfo.displayName} />
                        </div>
                        {/* <div className="user-name">
                            <div className="name">{loggedUserInfo.userInfo.displayName}</div>
                            <div className="nickname">{loggedUserInfo.userInfo.nickname}</div>
                        </div> */}
                        <div className="user-options">
                            <div className="option">Profile Settings</div>
                            <div className="option">Settings</div>
                            <div className="option">Logout</div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}