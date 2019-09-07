import React from 'react';
import { PostAuthor } from "./PostAuthor";
import { PostContent } from "./PostContent";
import { PostComment } from "./PostComment";
import { getUserPosts } from '../../../services/postService';

export default class Post extends React.Component {
    state = {
        userPosts: []
    }

    componentDidMount() {
        getUserPosts('kuddus', data => {
            this.setState({
                userPosts: data
            })
        })
    }
    
    render() {
        return (
            <div className="post-section">
                {this.state.userPosts.map((postObject, postKey) => {
                    return (
                        <div className="post" key={postKey}>
                            <PostAuthor authorInfo= {postObject.userInfo} />
                            <PostContent postContent= {postObject.content} />
                            <div className="lcs-section">
                                <div className="lcs-buttons">
                                    <div className="like-dislike liked">
                                        <button><i className="material-icons">thumb_up</i></button><span className="like-amount">{postObject.activities.reactions.likes.count}</span>
                                        <button><i className="material-icons">thumb_down</i></button><span className="dislike-amount">{postObject.activities.reactions.dislikes.count}</span>
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
                                <PostComment postComments= {postObject.activities.comments} />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}