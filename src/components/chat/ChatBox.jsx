import React from "react"
import { apiBaseUrl } from "../../services/commonService"
import { getUserMessages, sendUserMessage } from "../../services/userService"
import { socketConnection } from "../../sockets/socket"

export class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputRow: 1,
            userInput: '',
            messageList: [],
            newMessage: false
        }
    }

    componentDidMount() {
        this.updateMessages()

        // Update after getting signal
        socketConnection.on('sendMessage', userId => {
            this.updateMessages()
        })
    }

    handleInput = event => {
        if(event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            if(this.state.userInput.trim().length) {
                this.sendMessage(this.state.userInput)
            }
        }
        else {
            let inputHeight = event.target.scrollHeight
            this.setState({
                inputRow: inputHeight >= 38 ? inputHeight / 14 : 1,
                userInput: event.target.value
            })
        }
    }

    updateMessages = () => {
        getUserMessages(this.props.userInfo.userId, messages => {
            this.setState({
                messageList: messages
            })
        })
    }

    sendMessage = () => {
        if(this.state.userInput.trim().length) {
            sendUserMessage(this.props.userInfo.userId, this.state.userInput, response => {
                if(response.sendStatus) {
                    this.updateMessages()
                    socketConnection.emit('sendMessage', this.props.userInfo.userId)
                }
                this.setState({
                    userInput: ''
                })
            })
        }
    }

    renderMessage = () => {
        if(this.state.messageList.length <= 0) {
            return(
                <div className="empty-message"><i className="icon-smile"></i> Message box is empty</div>
            )
        }
        else {
            return(
                this.state.messageList.map(data => {
                    return(
                        <div className={ `message-cell ${ data.origin === "self" ? "self" : "other" }` } key={ data._id }>
                            {data.origin === "self" && (<span className="action"><i className="icon-ellips-v"></i></span>)}
                            <span className="message">{ data.message }</span>
                        </div>
                    )
                })
            )
        }
    }

    render() {
        return(
            <div className={`chat-box ${this.state.newMessage ? 'new' : ''}`} key={ this.props.userInfo.userId }>
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
                    { this.renderMessage() }
                </div>
                <div className="box-form">
                    <div className="emoji" title="Coming soon..."><i className="icon-smile"></i></div>
                    <div className="message-input">
                        <textarea
                            style={ { minHeight: '30px', maxHeight: '120px', lineHeight: '14px' } }
                            rows={ this.state.inputRow }
                            onChange={ this.handleInput }
                            onKeyDown={ this.handleInput }
                            value= { this.state.userInput }
                        />
                    </div>
                    <button className="send" onClick={ this.sendMessage }><i className="icon-send"></i></button>
                </div>
            </div>
        )
    }
}