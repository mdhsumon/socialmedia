import React from "react"
import { loggedUserInfo, apiBaseUrl } from "../services/commonService"
import socketIOclient from "socket.io-client"

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newFriend: false,
            acceptCount: 0
        }
        const socket = socketIOclient('http://localhost:8000')
        socket.on('friendAcceptedSocket', acceptedId => {
            this.setState({
                newFriend: true,
                acceptCount: this.state.acceptCount + 1
            })
            console.log(acceptedId)
        })
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <header className="header">
                <div className="header-container">
                    {/* <div className="logo-bar">
                        <img src="" alt="Logo"/>
                    </div> */}
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
                    <div className="user-bar">
                        <div className="user-photo">
                        <a href="/profile"><img src={apiBaseUrl + loggedUserInfo.userInfo.profilePhoto} alt={loggedUserInfo.userInfo.displayName} /></a>
                        </div>
                        <div className="user-name">
                            <div className="name">{loggedUserInfo.userInfo.displayName}</div>
                            <div className="nickname">{loggedUserInfo.userInfo.nickname}</div>
                        </div>
                        <div className="user-options">
                        
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}