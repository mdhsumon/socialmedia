import React from "react";

export const PostReactions = props => {
    return (
        <div className="lcs-section">
            <div className="like-dislike liked">
                <button><i className="material-icons">thumb_up</i></button>
                <span className="like-amount">{props.reactions.likes.count}</span>
                <button><i className="material-icons">thumb_down</i></button>
                <span className="dislike-amount">{props.reactions.dislikes.count}</span>
            </div>
            <div className="add-comment">
                <form className="commment-input">
                    <input type="text" placeholder="Write a comment..." />
                </form>
            </div>
            <button className="share-button">
                <i className="material-icons">share</i>
            </button>
    </div>
    )
}