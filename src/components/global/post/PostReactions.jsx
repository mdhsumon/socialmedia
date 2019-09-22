import React from "react";
import { getPostColumn } from "../../../services/postService";

export const PostReactions = props => {
    const updateReaction = event => {
        getPostColumn('activities', props.postId, data => {
            console.log(data)
        })
    }
    return (
        <div className="lcs-section">
            <div className="like-dislike">
                <button className="like" onClick={updateReaction.bind(this)}><i className="material-icons">thumb_up</i></button>
                <span className="like-amount">{props.reactions.likes.count}</span>
                <button className="dislike"><i className="material-icons">thumb_down</i></button>
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