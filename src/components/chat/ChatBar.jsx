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
                    {this.state.chatUsers.map(user => {
                        return(
                            <div className="chat-user online">
                                <div className="user-thumb">
                                    <img src={apiBaseUrl + '/file/global/image/male.png'} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}