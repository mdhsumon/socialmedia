import React from "react"
import { apiBaseUrl, loggedUserInfo } from "../../services/commonService"
import { getUserMessages, sendUserMessage, deleteUserMessage } from "../../services/chatService"
import { socketConnection } from "../../sockets/socket"
import { showTime } from "../../commonActions"

export class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isActive: false,
            sendButton: false,
            isGroupChat: false,
            inputRow: 1,
            userInput: '',
            messageList: [],
            userTyping: []
            //newMessage: false
        }
    }

    scrollToTarget = target => { target.scrollIntoView({ behavior: "smooth" }) }

    componentDidMount() {
        this.updateMessages()
        // Update after getting signal
        socketConnection.on('receiveMessage', senderId => {
            this.updateMessages(() => {
                this.setState({
                    senderId: senderId,
                    userTyping: []
                })
                this.state.isActive ? this.scrollToTarget(this.bottomFlag) : this.setState({newMessage: true})
            })
        })
        // Get user typing status
        socketConnection.on('getTyping', userId => {
            let typerList = [...this.state.userTyping]
            typerList.push(userId)
            if(this.state.isActive) {
                this.setState({userTyping: typerList})
                this.scrollToTarget(this.bottomFlag)
            }
        })
        // Get user stop typing status
        socketConnection.on('getStopTyping', userId => {
            let typerList = [...this.state.userTyping]
            typerList = typerList.filter(typer => typer !== userId)
            this.setState({userTyping: typerList})
        })
    }

    newMessage = () => {
        this.scrollToTarget(this.bottomFlag)
        this.setState({newMessage: false})
    }

    handleInput = event => {
        if(event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            this.sendMessage()
        }
        else {
            let inputHeight = event.target.scrollHeight
            this.setState({
                inputRow: Math.floor(inputHeight >= 38 ? inputHeight / 14 : 1),
                userInput: event.target.value
            }, () => {
                const sendBtn = this.state.userInput.trim().length ? true : false
                this.setState({ sendButton: sendBtn }, () => {
                    // Send typing status
                    sendBtn ?
                    socketConnection.emit('sendTyping', loggedUserInfo.id, this.props.userInfo.userId) :
                    socketConnection.emit('stopTyping', loggedUserInfo.id, this.props.userInfo.userId)
                })
            })
        }
    }

    handleFocus = () => {
        this.setState({ isActive: true, senderId: '' })
    }

    handleBlur = () => {
        this.setState({ isActive: false })
    }

    updateMessages = callback => {
        getUserMessages(this.props.userInfo.userId, messages => {
            this.setState({ messageList: messages.messageList })
            callback && callback()
        })
    }

    sendMessage = () => {
         if(this.state.userInput.trim().length) {
            sendUserMessage(this.props.userInfo.userId, this.state.userInput, response => {
                if(response.status) {
                    this.updateMessages()
                    // Send message notification
                    socketConnection.emit('sendMessage', loggedUserInfo.id, this.props.userInfo.userId)
                }
                this.setState({
                    userInput: '',
                    sendButton: false
                })
            })
        }
    }

    managePopMenu = index => {
        this.setState({
            activeIndex: index
        })
    }

    editMessage = (message, messageId) => {
        this.setState({ userInput: message })
    }

    deleteMessage = (friendId, messageId) => {
        deleteUserMessage(friendId, messageId, response => {
            if(response.status) {
                this.updateMessages()
            }
        })
    }

    renderMessage = () => (
        this.state.messageList.length ? this.state.messageList.map((data, index) => (
        <div className={ `message-cell ${ data.origin === "self" ? "self" : "other" }` } key={ data._id }>
            <div className="message-item">
                <span className="message">{ data.message }</span>
                <span className="time" title={ showTime(data.time, "auto") }><i className="icon-time"></i></span>
                <span className={`action${this.state.activeIndex === index ? ' active' : ''}`} onClick={() => this.managePopMenu(index)}>
                    {data.origin === "self" ? (
                        <React.Fragment>
                            <i className="icon-ellips-v"></i>
                            {this.state.activeIndex === index && (
                                <span className="pop-menu">
                                    <i className="edit icon-pencil" onClick={() => this.editMessage(data.message, data._id)}></i>
                                    <i className="remove icon-bin-fill" onClick={() => this.deleteMessage(this.props.userInfo.userId, data._id)}></i>
                                </span>
                            )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <i className="icon-smile-o"></i>
                            {/* <span className="pop-menu">
                                <i className="icon-pencil"></i>
                                <i className="icon-remove"></i>
                            </span> */}
                        </React.Fragment>
                    )}
                </span>
            </div>
        </div>)) : (<div className="empty-message"><i className="icon-heart-broken"></i> Message box is empty</div>)
    )

    onCloseChat = userId => {
        this.props.closeChatBox(userId)
        // Send typing status
        socketConnection.emit('stopTyping', loggedUserInfo.id, userId)
    }

    render() {
        const [userInfo] = [this.props.userInfo]
        const [typerCount, typerList] = [this.state.userTyping.length, this.state.userTyping]
        return (
            <div className={`chat-box${this.state.isActive ? ' active' : this.state.senderId === userInfo.userId ? ' new' : '' }`} key={ userInfo.userId }>
                <div className="box-head">
                    <div className="user-photo"><img src={ apiBaseUrl + userInfo.profilePhoto } alt={ userInfo.displayName } /></div>
                    <div className="display-name"><a href={ apiBaseUrl + '/user/' + userInfo.username }>{ userInfo.displayName }</a></div>
                    <div className="action">
                        <span className="close" onClick={ () => this.onCloseChat(userInfo.userId) }>
                            <i className="icon-close"></i>
                        </span>
                    </div>
                </div>
                <div className="box-body">
                    { this.renderMessage() }
                    { typerCount > 0 && (this.state.isGroupChat ?
                        <div className="user-typing">
                            {typerList.map(user =>
                            <span className="typer">
                                <img src={user.profilePhoto} title={user.displayName} alt={user.displayName} />
                                <span className="typing"></span>
                            </span>)}
                        </div> :
                        <span className="typing"></span>
                    )}
                    <div className="bottom-flag" ref={ r => { this.bottomFlag = r } }></div>
                </div>
                {/* {this.state.newMessage && this.state.senderId === userInfo.userId && (
                    <span className="new-message" onClick={this.newMessage}>New Message &darr;</span>
                )} */}
                <div className="box-form">
                    <div className="attach">
                        <div className="emoji"><i className="icon-smile-o"></i></div>
                        <div className="file"><i className="icon-attachment"></i></div>
                    </div>
                    <div className="message-input">
                        <textarea
                            style={ { minHeight: '33px', maxHeight: '120px', lineHeight: '14px' } }
                            rows={ this.state.inputRow }
                            onChange={ this.handleInput }
                            onKeyDown={ this.handleInput }
                            onFocus={ this.handleFocus }
                            onBlur={ this.handleBlur }
                            value={ this.state.userInput }
                            placeholder="Write message..."
                        />
                    </div>
                    <span className={`send${!this.state.sendButton ? ' disabled' : ''}`} onClick={ this.sendMessage }>
                        <i className="icon-send"></i>
                    </span>
                </div>
            </div>
        )
    }
}