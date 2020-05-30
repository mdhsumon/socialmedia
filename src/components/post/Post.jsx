import React from 'react'
import { getUserFeeds, getUserPosts } from '../../services/postService'
import { PostCreate } from "./PostCreate"
import PostAuthor from "./PostAuthor"
import { PostContent } from "./PostContent"
import { PostReactions } from "./PostReactions"
import { PostComment } from "./PostComment"
import { isUrl } from '../../commonActions'

export class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: true,
            postData: []
        }
        this.loadPosts()
    }

    loadPosts = () => {
        const getPost = isUrl('/feeds') ? getUserFeeds : getUserPosts
        getPost(this.props.userId, data => {
            data.status && this.setState({ postData: data.posts })
        })
    }

    // Passed to PostCreate for updating empty block
    removeEmpty = () => {
        this.setState({ isEmpty: false })
    }

    // Passed to PostCreate for updating new post
    postCreateFlag = createdPost => {
        this.state.postData.unshift(createdPost)
        this.setState({ postData: this.state.postData })
    }

    // Passed to PostAuthor to delete post
    deletePostFlag = postId => {
        const postList = this.state.postData.filter(post => post._id !== postId)
        this.setState({ postData: postList })
    }

    renderPost = () => {
        const postData = this.state.postData
        if (postData.length > 0) {
            return this.state.postData.map(post => {
                return (
                    <div className={`post ${post.visibility}`} key={post._id}>
                        <PostAuthor postInfo={{ id: post._id, author: post.userInfo, createdAt: post.createdAt }} deletePostFlag={this.deletePostFlag} />
                        <PostContent postContent={post.content} />
                        {post.visibility !== 'private' &&
                            <PostReactions
                                reactions={post.reactions}
                                postInfo={{ id: post._id, userId: post.userId }}
                                likeDislike={this.updateLikeDislike}
                            />
                        }
                        <PostComment postComments={post.comments} />
                    </div>
                )
            })
        }
        else {
            if (this.state.isEmpty) {
                return (
                    <div className="empty-post">
                        <i className="icon-newspaper"></i> 
                        <div className="empty-post-message">No post found</div>
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <div className="post-section">
                {isUrl(['/feeds', '/profile']) && <PostCreate postCreateFlag={this.postCreateFlag} removeEmpty={this.removeEmpty} />}
                {this.renderPost()}
            </div>
        )
    }
}