import React from "react"
import { apiBaseUrl } from "../../services/commonService"

export class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputRow: 1,
            userInput: '',
            messageList: []
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
            let inputHeight = event.target.scrollHeight
            this.setState({
                inputRow: inputHeight >= 38 ? inputHeight / 14 : 1,
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
            <div className="chat-box" key={ this.props.userInfo.userId }>
                <div className="box-head">
                    <div className="user-photo"><img src={ apiBaseUrl + this.props.userInfo.profilePhoto } alt="sf"/></div>
                    <div className="display-name">{ this.props.userInfo.displayName }</div>
                    <div className="action">
                        <span className="close" onClick={ this.props.closeChatBox.bind(this, this.props.userInfo.userId) }>
                            <i className="icon-close"></i>
                        </span>
                    </div>
                </div>
                <div className="box-body">
                    {this.state.messageList.map((data, key) => {
                        return(
                            <div className={ `message-cell ${ data.origin === "self" ? "self" : "other" }` } key={ key }>
                                <span className="message">{ data.message }</span>
                                <span className="action"><i className="icon-ellips-v"></i></span>
                            </div>
                        )
                    })}
                </div>
                <div className="box-form">
                    <div className="emoji"><i className="icon-smile"></i></div>
                    <div className="message-input">
                        <textarea
                            style={ { minHeight: '30px', maxHeight: '120px', lineHeight: '14px' } }
                            rows={ this.state.inputRow }
                            onChange={ this.handleInput }
                            onKeyDown={ this.handleInput }
                        />
                    </div>
                    <button className="send" onClick={ this.sendMessage }><i className="icon-send"></i></button>
                </div>
            </div>
        )
    }
}