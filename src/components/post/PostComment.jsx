import React from "react"
export class PostComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: this.props.postComments,
            replyMsg: '',
            display: 'none'
        }
    }

    toggleReply = event => {
        this.state.display === 'none' ? this.setState({ display: 'block' }) : this.setState({ display: 'none' })
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
                                        <img alt='' src="http://localhost:8081/file/global/image/male.png" />
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
                                <input style={{ display: this.state.display }} type="text" placeholder="Reply..." />
                            </div>
                        )
                    })}
                </div>
            )
        }
        else return null
    }
}