import React from "react"
import { apiBaseUrl } from "../../services/commonService"

export class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: '',
            messageList: [ { origin: 'other', messageId: '123', message: 'Hello pagla, how are you?' } ]
        }
    }

    handleInput = event => {
        if(event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            this.state.messageList.push({ origin: 'self', messageId: '123', message: this.state.userInput })
            this.setState({
                messageList: this.state.messageList
            })
        }
        else {
            this.setState({
                userInput: event.target.value
            })
        }
    }

    sendMessage = event => {
        this.state.messageList.push({ origin: 'self', messageId: '123', message: this.state.userInput })
        this.setState({
            messageList: this.state.messageList
        })
    }

    render() {
        return(
            <div className="chat-box">
                <div className="box-head">
                    <div className="user-photo"><img src={apiBaseUrl + '/file/global/image/male.png'} alt="sf"/></div>
                    <div className="display-name">Disaplay name</div>
                    <div className="action">
                        <span className="close">x</span>
                    </div>
                </div>
                <div className="box-body">
                    {this.state.messageList.map((data, key) => {
                        return(
                            <div className={`message-cell ${ data.origin === "self" ? "self" : "other" }`} key={key}>
                                <span className="message">{data.message}</span>
                                <span className="action"><i className="icon-ellips-v"></i></span>
                            </div>
                        )
                    })}
                </div>
                <div className="box-form">
                    <div className="emoji">:)</div>
                    <div className="message-input"><textarea rows="1" onChange={this.handleInput} onKeyDown={this.handleInput} /></div>
                    <button className="send" onClick={this.sendMessage}>=></button>
                </div>
            </div>
        )
    }
}