import React from "react"
import { apiBaseUrl } from "../../services/commonService"
import { updatePost } from "../../services/postService"
export class PostComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: this.props.postComments,
            replyMsg: '',
            replyForm: false
        }
    }
    
    handleReply = (event, comId) => {
        if(event.key === "Enter") {
            if(this.state.replyMsg.trim().length) {
                updatePost(
                    this.props.postId,
                    { area: "comment", action: "addreply", commentId: comId, data: this.state.replyMsg },
                    comRes => {
                        console.log("RR", comRes)
                        if(comRes.status) {
                            // Comment signal goes here
                        }
                    }
                )
            }
        }
        else this.setState({replyMsg: event.target.value})
    }

    toggleReply = comId => this.setState({replyForm: !this.state.replyForm})

    render() {
        if(this.state.comments.length) {
            return(
                <div className="comment-reply">
                    {this.state.comments.map(comment => (
                        <div className="comment" key={comment._id}>
                            <div className="comment-section">
                                <div className="commentor">
                                    <img src={apiBaseUrl + comment.profilePhoto} alt={comment.displayName} />
                                </div>
                                <div className="comment-body">{comment.message}</div>
                                <div className="action">
                                    <span className="reply" onClick={() => this.toggleReply(comment._id)}>Reply</span>
                                </div>
                            </div>
                            {comment.replies.length > 0 && comment.replies.map((reply, key) => (
                                <div className="reply-section" key={key}>
                                    <div className="replyar">
                                        <img src={apiBaseUrl + reply.profilePhoto} alt={reply.displayName} />
                                    </div>
                                    <div className="reply-message">{reply.message}</div>
                                </div>
                            ))}
                            {this.state.replyForm && (
                                <div className="reply-form">
                                    <img src="dsf" alt="sdf"/>
                                    <input type="text" placeholder="Write a reply..." onChange={(event) => this.handleReply(event, comment._id)} onKeyDown={(event) => this.handleReply(event, comment._id)} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )
        }
        else return null
    }
}