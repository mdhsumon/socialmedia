import React from 'react'
import { loggedUserInfo } from '../../services/commonService'
import { getUserFeeds, getUserPosts } from '../../services/postService'
import { PostCreate } from "./PostCreate"
import { PostAuthor } from "./PostAuthor"
import { PostContent } from "./PostContent"
import { PostReactions } from "./PostReactions"
import { PostComment } from "./PostComment"

export class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: true,
            postData: []
        }
    }

    getPosts = () => {
        const getPost = window.location.pathname === '/feeds' ? getUserFeeds : getUserPosts
        getPost(loggedUserInfo.userInfo.username, data => {
            this.setState({
                postData: data
            })
        })
    }

    componentDidMount() {
        this.getPosts()
    }

    // Passed to PostCreate for updating empty block
    removeEmpty = () => {
        this.setState({
            isEmpty: false
        })
    }

    // Passed to PostCreate for updating new post
    postCreateFlag = createdPost => {
        this.state.postData.unshift(createdPost)
        this.setState({
            postData: this.state.postData
        })
    }

    renderPost = () => {
        if(this.state.postData.length > 0) {
            return this.state.postData.map(postObject => {
                return (
                    <div className="post" key={postObject._id}>
                        {/* <PostAuthor authorInfo={postObject.userInfo} postInfo={{id: postObject._id, createdAt: postObject.createdAt}} />
                        <PostContent postContent={postObject.content} />
                        <PostReactions
                            reactions={postObject.activities.reactions}
                            postInfo={{id: postObject._id, userId: postObject.userId}}
                            likeDislike={this.updateLikeDislike}
                        />
                        <div className="comment-reply">
                            <PostComment postComments={postObject.activities.comments} />
                        </div> */}
                    </div>
                )
            })
        }
        else {
            if(this.state.isEmpty) {
                return (
                    <div className="empty-post">
                        <div className="empty-post-message">No post found</div>
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <div className="post-section">
                <PostCreate postCreateFlag={this.postCreateFlag} removeEmpty={this.removeEmpty} />
                {this.renderPost()}
            </div>
        )
    }
}