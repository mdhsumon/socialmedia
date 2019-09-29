import React from "react";
import { loggedUserInfo, apiBaseUrl } from "../services/commonService";
export const Header = () => {
    let loggedUser;
    loggedUserInfo(data => {loggedUser = data});
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
                    <div className="notification-item message">
                        <div className="notification-button"><i className="icon-text-bubble"></i></div>
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
                        {/* <img src={apiBaseUrl + loggedUser.profilePhoto} alt={loggedUser.displayName} /> */}
                    </div>
                    <div className="user-name">
                        {/* <div className="name">{loggedUser.displayName}</div> */}
                        <div className="nickname">nickname</div>
                    </div>
                    <div className="user-options">
                    
                    </div>
                </div>
            </div>
        </header>
    )
}