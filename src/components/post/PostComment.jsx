import React from "react"
//import { apiBaseUrl } from "../../services/commonService"
//import { getUserSummary } from "../../services/userService"
export class PostComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: this.props.postComments,
            replyMsg: '',
            isReply: false
        }
        // getUserSummary(this.props.postInfo.author.userId, data => {
        //     data.status && this.setState({
        //         commenter: {
        //             userId: data.users[0]._id,
        //             username: data.users[0].username,
        //             displayName: data.users[0].displayName,
        //             profilePhoto: data.users[0].profilePhoto,
        //             coverPhoto: data.users[0].coverPhoto
        //         }
        //     })
        // })
    }

    toggleReply = () => {
        this.setState({isReply: !this.state.isReply})
    }

    render() {
        if (this.state.comments.length) {
            return (
                <div className="comment-reply">
                    {this.state.comments.map(comment => {
                        return (
                            <div className="comment" key={comment._id}>
                                <div className="comment-section">
                                    <div className="commentor">
                                        <img src="{apiBaseUrl + comment.userInfo.profilePhoto}" alt="{comment.userInfo.displayName}" />
                                    </div>
                                    <div className="comment-body">{comment.message}</div>
                                    <div className="action">
                                        <span className="reply" onClick={this.toggleReply}>Reply</span>
                                    </div>
                                </div>
                                {comment.replies.length > 0 && (
                                    <div className="reply-section">
                                        <div className="replyar">
                                            <img alt={comment.displayName} src="http://localhost:8081/file/global/image/male.png" />
                                        </div>
                                        <div className="reply-message">Reply message</div>
                                    </div>
                                )}
                                {this.state.isReply && (
                                    <div className="reply-form">
                                        <img src="dsf" alt="sdf"/>
                                        <input type="text" placeholder="Reply..." />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )
        }
        else return null
    }
}