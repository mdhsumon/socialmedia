import React from "react"
import { loggedUserInfo, apiBaseUrl } from "../services/commonService"
export class Header extends React.Component {
    constructor(props) {
    
        super(props)
        
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
                                <span className="notification-count">3</span>
                            </div>
                            <div className="message-list">

                            </div>
                        </div>
                        <div className="notification-item friend-request">
                            <div className="notification-button"><i className="icon-user-add"></i></div>
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