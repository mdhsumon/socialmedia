import React from 'react';
import { DataPost } from '../../services/data-post';
import profilePhoto1 from '../../resources/users/id-1/profile-photo.jpg';
import postImage1 from '../../resources/users/id-1/shared/post-it.jpg';
import commentor from '../../resources/users/id-1/commentor.jpg';

export default class Post extends React.Component {
    render() {
        return (
            <div className="post-section">
                {DataPost.map((postObject, postKey) => {
                    return (
                        <div className="post" key={postKey}>
                            <div className="post-author">
                                <div className="author-post-detail">
                                    <div className="post-author-thumb">
                                        <img alt={postObject.postUserInfo.displayName} src={profilePhoto1} />
                                    </div>
                                    <div className="author-post-info">
                                        <div className="author-post_info">
                                            <a href="/" className="author-name">{postObject.postUserInfo.displayName}</a>
                                            <span className="post-attribute">shared a <a href="/">link</a></span>
                                        </div>
                                        <span className="post-date_time">at {postObject.postTime.time + ", " + postObject.postTime.date}</span>
                                    </div>
                                </div>
                                <button className="action-button"><i className="material-icons">more_horiz</i></button>
                            </div>
                            <div className="post-body">
                                <div className="post-text">
                                    <p>{postObject.postContent.message}</p>
                                </div>
                                {postObject.postContent.images.length > 0 &&
                                    <div className="post-image">
                                        <img alt="PostImage" src={postImage1} />
                                    </div>
                                }
                            </div>
                            <div className="lcs-section">
                                <div className="lcs-buttons">
                                    <div className="like-dislike liked">
                                        <button><i className="material-icons">thumb_up</i></button><span className="like-amount">{postObject.postActivities.reactions.likes.count}</span>
                                        <button><i className="material-icons">thumb_down</i></button><span className="dislike-amount">{postObject.postActivities.reactions.dislikes.count}</span>
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
                            </div>
                            <div className="comment-reply">
                                {postObject.postActivities.comments.map((comment, commentKey) => {
                                    return (
                                        <div className="comment" key={commentKey}>
                                            <div className="comment-author-thumb">
                                                <img alt={comment.displayName} src={commentor} title={comment.displayName} />
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
                                                            <img alt={postObject.postUserInfo.displayName} src={profilePhoto1} />
                                                        </div>
                                                        <form>
                                                            <input type="text" placeholder="reply..." />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}