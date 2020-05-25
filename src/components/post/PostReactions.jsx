import React from "react"
import { updatePost } from "../../services/postService"

export class PostReactions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLiked: false,
            isDisliked: false,
            reactCount: this.props.reactions.count,
            userComment: ''
        }
    }
    manageReaction = type => {
        const reactData = {
            area: "react",
            action: "like"
        }
        updatePost(this.props.postInfo.id, reactData, response => {
            console.log(response)
            if(response.status) {
                this.setState({isLiked: true})
            }
        })
    }
    handleComment = event => {
        if (event.key === 'Enter') {
            if (this.state.userComment.trim().length) {
                updatePost(
                    this.props.postInfo.id,
                    { area: "comment", action: "add", data: this.state.userComment },
                    comRes => {
                        if (comRes.status) {
                            alert('Your comment has been added on the post')
                        }
                    }
                )
            }
        }
        else {
            this.setState({
                userComment: event.target.value
            })
        }
    }
    render() {
        return (
            <div className="lcs-section">
                <div className="like-dislike">
                    <span className={`react like${this.state.isLiked ? ' done' : ''}`} onClick={() => this.manageReaction('like')}>
                        <i className="icon-like"></i>
                    </span>
                    <span className={`react emoji${this.state.isDisLiked ? ' done' : ''}`} onClick={() => this.manageReaction('emoji')}>
                        <i className="icon-smile-fill"></i>
                    </span>
                    {this.state.reactCount > 0 && <span className="reaction-count">{this.state.reactCount}</span>}
                </div>
                <div className="add-comment">
                    <input type="text" placeholder="Write a comment..." onChange={this.handleComment} onKeyDown={this.handleComment} />
                </div>
                <span className="share-button" title="Share">
                    <i className="icon-share"></i>
                </span>
            </div>
        )
    }
}