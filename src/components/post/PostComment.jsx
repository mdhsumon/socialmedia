import React from "react"
export const PostComment = props => {
    const comments = props.postComments
    if (comments.length) {
        return comments.map(comment => {
            return (
                <div className="comment-reply">
                    <div className="comment" key={comment._id}>
                        <div className="comment-section">
                            <div className="commentor">
                                <img alt='' src="http://localhost:8081/file/global/image/male.png" />
                            </div>
                            <div className="comment-body">{comment.message}</div>
                            <div className="action">
                                <span className="reply">Reply</span>
                            </div>
                        </div>
                        {comment.replies.length && (
                            <div className="reply-section">
                                <div className="replyar">
                                    <img alt={comment.displayName} src="http://localhost:8081/file/global/image/male.png" />
                                </div>
                                <div className="reply-message">Reply message</div>
                                <input type="text" placeholder="Reply..." />
                            </div>
                        )}
                    </div>
                </div>
            )
        })
    }
    else return null
}