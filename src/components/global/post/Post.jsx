import React from 'react';
import { PostCreate } from "./PostCreate";
import { PostAuthor } from "./PostAuthor";
import { PostContent } from "./PostContent";
import { PostReactions } from "./PostReactions";
import { PostComment } from "./PostComment";
import { getUserPosts } from '../../../services/postService';

export class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userPosts: []
        }
    }

    getPosts = () => {
        const userData = localStorage.getItem("userData") !== null ? JSON.parse(localStorage.getItem("userData")) : "";
        if(userData !== "") {
            getUserPosts(userData.userInfo.username, data => {
                this.setState({
                    userPosts: data
                });
            })
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    // Passed to PostCreate for updating new post
    postCreateFlag = createdPost => {
        this.state.userPosts.unshift(createdPost);
        this.setState({
            userPosts: this.state.userPosts
        });
    }

    renderPost = () => {
        if(this.state.userPosts.length > 0) {
            return this.state.userPosts.map(postObject => {
                return (
                    <div className="post" key={postObject._id}>
                        <PostAuthor authorInfo={postObject.userInfo} postInfo={{id: postObject._id, createdAt: postObject.createdAt}} />
                        <PostContent postContent={postObject.content} />
                        <PostReactions
                            reactions={postObject.activities.reactions}
                            postInfo={{id: postObject._id, userId: postObject.userInfo.userId}}
                            likeDislike={this.updateLikeDislike}
                        />
                        <div className="comment-reply">
                            <PostComment postComments={postObject.activities.comments} />
                        </div>
                    </div>
                )
            })
        }
        else {
            return (
                <div className="empty-post">
                    <div className="empty-post-message">No post found</div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="post-section">
                <PostCreate postCreateFlag={ this.postCreateFlag } />
                {this.renderPost()}
            </div>
        )
    }
}