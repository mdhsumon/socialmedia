import React from 'react';

export const Post = () => {
    return (
        <div className="post-section">
            <div className="post">
                <div className="post-author">
                    <div className="author-post-detail">
                        <div className="post-author-thumb">
                            <img alt="alter text" src="img/profile-photo.jpg" />
                        </div>
                        <div className="author-post-info">
                            <div className="author-post_info">
                                <a href="/" className="author-name">kuddus boyati</a>
                                <span className="post-attribute">shared a <a href="/">link</a></span>
                            </div>
                            <span className="post-date_time">8 hours</span>
                        </div>
                    </div>
                    <button className="action-button">
                        <i className="material-icons">more_horiz</i>
                    </button>
                </div>
                <div className="post-body">
                    <div className="post-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                    <div className="post-image">
                        <img alt="alter text" src="img/Post-It.jpg" />
                    </div>
                </div>
                <div className="LCS-section">
                    <div className="lcs-buttons">
                        <div className="like-dislike liked">
                            <button><i className="material-icons">thumb_up</i></button><span className="like-amount">1920</span>
                            <button><i className="material-icons">thumb_down</i></button><span className="dislike-amount">420</span>
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
                    <div className="comment">
                        <div className="comment-author-thumb">
                            <img alt="alter text" src="img/profile-photo2.jpg" />
                        </div>
                        <div className="author-comment-info">
                            <div className="author-comment_body">
                                <span className="author-name"><a href="/">kuddus boyati</a></span>
                                <span className="comment-body">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
                            </div>
                            <div className="like-reply">
                                <div className="like-dislike disliked">
                                    <button><i className="material-icons">thumb_up</i></button><span className="like-amount">1920</span>
                                    <button><i className="material-icons">thumb_down</i></button><span className="dislike-amount">420</span>
                                    <button><i className="material-icons">reply</i></button><span>reply</span>
                                </div>
                                <div className="reply">
                                    <div className="reply-author-thumb">
                                        <img alt="alter text" src="img/profile-photo.jpg" />
                                    </div>
                                    <form>
                                        <input type="text" placeholder="reply..." />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post">
                <div className="post-author">
                    <div className="author-post-detail">
                        <div className="post-author-thumb">
                            <img alt="alter text" src="img/profile-photo.jpg" />
                        </div>
                        <div className="author-post-info">
                            <div className="author-post_info">
                                <a href="/" className="author-name">kuddus boyati</a>
                                <span className="post-attribute">shared a <a href="/">link</a></span>
                            </div>
                            <span className="post-date_time">8 hours</span>
                        </div>
                    </div>
                    <button className="action-button">
                        <i className="material-icons">more_horiz</i>
                    </button>
                </div>
                <div className="post-body">
                    <div className="post-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                    <div className="post-image">
                        <img alt="alter text" src="img/Post-It.jpg" />
                    </div>
                </div>
                <div className="LCS-section">
                    <div className="lcs-buttons">
                        <div className="like-dislike liked">
                            <button><i className="material-icons">thumb_up</i></button><span className="like-amount">1920</span>
                            <button><i className="material-icons">thumb_down</i></button><span className="dislike-amount">420</span>
                        </div>
                        <div className="add-comment">
                            <form className="commment-input">
                                <input type="text" placeholder="Write a comment..." />
                            </form>
                        </div>
                        <button className="share-button">
                            <i role="checkbox" className="material-icons">share</i>
                        </button>
                    </div>
                </div>
                <div className="comment-reply">
                    <div className="comment">
                        <div className="comment-author-thumb">
                            <img alt="alter text" src="img/profile-photo2.jpg" />
                        </div>
                        <div className="author-comment-info">
                            <div className="author-comment_body">
                                <span className="author-name"><a href="/">kuddus boyati</a></span>
                                <span className="comment-body">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
                            </div>
                            <div className="like-reply">
                                <div className="like-dislike disliked">
                                    <button><i className="material-icons">thumb_up</i></button><span className="like-amount">1920</span>
                                    <button><i className="material-icons">thumb_down</i></button><span className="dislike-amount">420</span>
                                    <button><i className="material-icons">reply</i></button><span>reply</span>
                                </div>
                                <div className="reply">
                                    <div className="reply-author-thumb">
                                        <img alt="alter text" src="img/profile-photo.jpg" />
                                    </div>
                                    <form>
                                        <input type="text" placeholder="reply..." />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}