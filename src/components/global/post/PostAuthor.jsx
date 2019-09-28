import React from "react";
import { apiBaseUrl } from "../../../services/commonService";
import { deletePost } from "../../../services/postService";

export const PostAuthor = props => {
    const removePost = postId => {
        deletePost(postId, response => {
            if(response.deletedtatus) {
                alert('deleted')
            }
        })
    }
    return (
        <div className="post-author">
            <div className="author-post-detail">
                <div className="post-author-thumb">
                    <img src={apiBaseUrl + props.authorInfo.profilePhoto} alt={props.authorInfo.displayName} />
                </div>
                <div className="author-post-info">
                    <div className="author-post_info">
                        <a href={props.authorInfo.username} className="author-name">{props.authorInfo.displayName}</a>
                    </div>
                    <span className="post-date-time">at {props.postInfo.createdAt}</span>
                </div>
            </div>
            <button className="action-button" onClick={removePost.bind(this, props.postInfo.id)}><i className="icon-ellips-h"></i></button>
        </div>
    )
}