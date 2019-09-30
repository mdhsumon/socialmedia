import React from "react"
export const MessagePopup = (props) => {
    return (
        <div className={`message-popup ${props.status}`}>
            <div className="message">{props.message}</div>
        </div>
    )
}