import React from "react"
import ReactDOM from "react-dom"

export const MessagePopup = props => {
    return ReactDOM.createPortal (
        <div className={`message-popup ${props.status}`}>
            <div className="message">{props.message}</div>
        </div>,
        document.body
    )
}