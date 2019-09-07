import React from "react";
export const PostComment = (props) => {
    if(props.postComments.length > 0)
    props.postComments.map((comment, commentKey) => {
        return (
            <div className="comment" key={commentKey}>
            <div className="comment-author-thumb">
                <img alt={comment.displayName} src="" title={comment.displayName} />
            </div>
            <div className="author-comment-info">
                <div className="author-comment_body">
                    <span className="author-name"><a href="/">{comment.displayName}</a></span>
                    <div className="comment-body">{comment.message}</div>
                </div>
                <div className="like-reply">
                    <div className="like-dislike disliked">
                        <button><i className="material-icons">thumb_up</i></button><span className="like-amount">{comment.reactions.likes.count}</span>
                        <button><i className="material-icons">thumb_down</i></button><span className="dislike-amount">{comment.reactions.dislikes.count}</span>
                        <button><i className="material-icons">reply</i></button><span>reply</span>
                    </div>
                    <div className="reply">
                        <div className="reply-author-thumb">
                            <img alt={comment.displayName} src="" />
                        </div>
                        <form>
                            <input type="text" placeholder="reply..." />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    })
    else return null
}