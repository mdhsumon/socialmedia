import React from 'react';
import { PostCreate } from "./PostCreate";
import { PostAuthor } from "./PostAuthor";
import { PostContent } from "./PostContent";
import { PostReactions } from "./PostReactions";
import { PostComment } from "./PostComment";
import { getUserPosts } from '../../../services/postService';

export class Post extends React.Component {
    state = {
        userPosts: []
    }

    componentDidMount() {
        getUserPosts('new-user', data => {
            this.setState({
                userPosts: data
            })
        })
    }

    renderPost = () => {
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
    
    render() {
        return (
            <div className="post-section">
                <PostCreate />
                {this.renderPost()}
            </div>
        )
    }
}