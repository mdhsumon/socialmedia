import React from "react";

export const PostAuthor = props => {
    return (
        <div className="post-author">
            <div className="author-post-detail">
                <div className="post-author-thumb">
                    <img src={props.authorInfo.profilePhoto} alt={props.authorInfo.displayName} />
                </div>
                <div className="author-post-info">
                    <div className="author-post_info">
                        <a href={"/"} className="author-name">{props.authorInfo.displayName}</a>
                        <span className="post-attribute"> shared a <a href="/">link</a></span>
                    </div>
                    <span className="post-date-time">at {props.authorInfo.username}, {props.authorInfo.username}</span>
                </div>
            </div>
            <button className="action-button"><i className="material-icons">more_horiz</i></button>
        </div>
    )
}