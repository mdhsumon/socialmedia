import React from "react"
import { updatePost } from "../../services/postService"

export class PostReactions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLiked: false,
            isDisliked: false,
            userComment: ''
        }
    }
    manageReaction = event => {
        this.setState({
            isLiked: true
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
                    <button className={this.state.isLiked ? 'like liked' : 'like'} onClick={this.manageReaction}>
                        <i className="icon-like"></i>
                    </button>
                    <button className={this.state.isDisLiked ? 'dislike disliked' : 'dislike'} onClick={this.manageReaction}>
                        <i className="icon-smile-fill"></i>
                    </button>
                    <span className="reaction-count">0</span>
                </div>
                <div className="add-comment">
                    <input type="text" placeholder="Write a comment..." onChange={this.handleComment} onKeyDown={this.handleComment} />
                </div>
                <button className="share-button">
                    <i className="icon-share"></i>
                </button>
            </div>
        )
    }
}