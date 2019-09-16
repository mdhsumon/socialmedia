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
            isLoading: true,
            userPosts: []
        }
    }

    componentDidMount() {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';
        getUserPosts(userInfo.username, data => {
            this.setState({
                isLoading: false,
                userPosts: data
            });
        })
    }

    renderPost = () => {
        if(this.state.isLoading) {
            return (
                <div className="card-loader"></div>
            )
        }
        else {
            if(this.state.userPosts.length > 0) {
                return this.state.userPosts.map(postObject => {
                    return (
                        <div className="post" key={postObject._id}>
                            <PostAuthor authorInfo={postObject.userInfo} />
                            <PostContent postContent={postObject.content} />
                            <PostReactions reactions={postObject.activities.reactions} />
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
    }

    // Passed to PostCreate for updating new post
    postCreateFlag = () => {
        this.setState({
            isLoading: true
        })
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