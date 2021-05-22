import React from "react"
import { apiBaseUrl } from "../../services/commonService"
export class PostComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: this.props.postComments,
            replyMsg: '',
            replyForm: []
        }
    }

    ReplyFormComp = () => {
        return(
            <div className="reply-form">
                <img src="dsf" alt="sdf"/>
                <input type="text" placeholder="Write a reply..." />
            </div>
        )
    }

    toggleReply = comId => {
        this.setState({
            replyForm: [
                <div key={comId} className="reply-form">
                    <img src="dsf" alt="sdf"/>
                    <input type="text" placeholder="Write a reply..." />
                </div>,
                ...this.state.replyForm
            ]
        })
    }

    render() {
        if (this.state.comments.length) {
            return (
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
                            {comment.replies.length > 0 || true && [1,2].map((reply, key) => (
                                <div className="reply-section" key={key}>
                                    <div className="replyar">
                                        <img src={apiBaseUrl + comment.profilePhoto} alt={comment.displayName} />
                                    </div>
                                    <div className="reply-message">Reply message</div>
                                </div>
                            ))}
                            {this.state.replyForm}
                        </div>
                    ))}
                </div>
            )
        }
        else return null
    }
}