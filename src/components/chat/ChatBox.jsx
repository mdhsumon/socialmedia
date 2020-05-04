import React from "react"
import { apiBaseUrl } from "../../services/commonService"
import { getUserMessages, sendUserMessage } from "../../services/userService"
import { socketConnection } from "../../sockets/socket"
import { getTime } from "../../commonActions"

export class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isActive: false,
            sendButton: false,
            newMessage: false,
            inputRow: 1,
            userInput: '',
            messageList: []
        }
    }

    scrollToTarget = target => { target.scrollIntoView({ behavior: "smooth" }) }

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
            this.sendMessage()
        }
        else {
            let inputHeight = event.target.scrollHeight
            const sendBtn = this.state.userInput.length ? true : false
            this.setState({
                inputRow: Math.floor(inputHeight >= 38 ? inputHeight / 14 : 1),
                userInput: event.target.value,
                sendButton: sendBtn
            })
        }
    }

    handleFocus = () => {
        this.setState({ 
            isActive: true,
            newMessage: false
        })
    }

    handleBlur = () => {
        this.setState({ isActive: false })
    }

    updateMessages = () => {
        getUserMessages(this.props.userInfo.userId, messages => {
            this.setState({ messageList: messages })
            this.scrollToTarget(this.bottomFlag)
        })
    }

    sendMessage = () => {
         if(this.state.userInput.trim().length) {
            sendUserMessage(this.props.userInfo.userId, this.state.userInput, response => {
                if(response.status) {
                    this.updateMessages()
                    socketConnection.emit('sendMessage', this.props.userInfo.userId)
                }
                this.setState({
                    userInput: ''
                })
            })
        }
    }

    renderMessage = () => (
        this.state.messageList.length >= 1 ? this.state.messageList.map(data => (
        <div className={ `message-cell ${ data.origin === "self" ? "self" : "other" }` } key={ data._id }>
            <div className="message-item">
                <span className="message">{ data.message }</span>
                <span className="time" title={ getTime(data.time, "auto") }><i className="icon-time"></i></span>
                <span className="action">{data.origin === "self" ? <i className="icon-ellips-v"></i> : <i className="icon-smile-line"></i>}</span>
            </div>
        </div>)) : (<div className="empty-message"><i className="icon-smile-line"></i> Message box is empty</div>)
    )

    render() {
        const [userInfo] = [this.props.userInfo]
        return (
            <div className={`chat-box${this.state.isActive ? ' active' : this.state.newMessage ? ' new' : '' }`} key={ userInfo.userId }>
                <div className="box-head">
                    <div className="user-photo"><img src={ apiBaseUrl + userInfo.profilePhoto } alt={ userInfo.displayName } /></div>
                    <div className="display-name"><a href={ apiBaseUrl + '/user/' + userInfo.username }>{ userInfo.displayName }</a></div>
                    <div className="action">
                        <span className="close" onClick={ this.props.closeChatBox.bind(this, userInfo.userId) }>
                            <i className="icon-close"></i>
                        </span>
                    </div>
                </div>
                <div className="box-body">
                    { this.renderMessage() }
                    <div className="bottom-flag" ref={ r => { this.bottomFlag = r } }></div>
                </div>
                <div className="box-form">
                    <div className="attach">
                        <div className="emoji"><i className="icon-smile-line"></i></div>
                        <div className="file"><i className="icon-attachment"></i></div>
                    </div>
                    <div className="message-input">
                        <textarea
                            style={ { minHeight: '30px', maxHeight: '120px', lineHeight: '14px' } }
                            rows={ this.state.inputRow }
                            onChange={ this.handleInput }
                            onKeyDown={ this.handleInput }
                            onFocus={ this.handleFocus }
                            onBlur={ this.handleBlur }
                            value={ this.state.userInput }
                        />
                    </div>
                    <button className="send" onClick={ this.sendMessage } disabled={ !this.state.sendButton }><i className="icon-send"></i></button>
                </div>
            </div>
        )
    }
}