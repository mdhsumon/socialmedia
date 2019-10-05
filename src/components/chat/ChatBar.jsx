import React from "react"
import { apiBaseUrl } from "../../services/commonService"

export class ChatBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chatUsers: [1,2,3,4,5]
        }
    }

    render() {
        return(
            <div className="chat-bar">
                <div className="chat-user-container">
                    <div className="user-list">
                        {this.state.chatUsers.map(user => {
                            return(
                                <div className="chat-user online" key={user}>
                                    <div className="user-thumb">
                                        <img src={apiBaseUrl + '/file/global/image/male.png'} alt="User name" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="chatting-panel">
                        <div className="chat-box">
                            <div className="box-head">
                                <div className="user-photo"><img src="" alt="sf"/></div>
                                <div className="display-name">Disaplay name</div>
                            </div>
                            <div className="box-body">
                                <div className="message-item self">
                                    <span className="message">Message here</span>
                                    <span className="actions">...</span>
                                </div>
                                <div className="message-item other">
                                    <span className="message">Message here</span>
                                    <span className="actions">...</span>
                                </div>
                            </div>
                            <div className="box-form">
                                <div className="emoji">emoji</div>
                                <div className="message-input">message input</div>
                                <button className="send">=></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}