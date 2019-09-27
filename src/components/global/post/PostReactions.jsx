import React from "react";
import { updateReaction } from "../../../services/postService";

export class PostReactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked: false,
            isDisliked: false,
        }
        this.manageReaction = this.manageReaction.bind(this);
    }
    manageReaction = event => {
        this.setState({
            isLiked: true
        })
        // updateReaction('activities', props.postInfo.id, props.postInfo.userId, data => {
       
        // })
    }
    render() {
        return (
            <div className="lcs-section">
                <div className="like-dislike">
                    <button className={this.state.isLiked ? 'like liked' : 'like'} onClick={this.manageReaction}>
                        <i className="material-icons">thumb_up</i>
                    </button>
                    <span className="like-amount">{this.props.reactions.likes.count}</span>
                    <button className={this.state.isDisLiked ? 'dislike disliked' : 'dislike'} onClick={this.manageReaction}>
                        <i className="material-icons">thumb_down</i>
                    </button>
                    <span className="dislike-amount">{this.props.reactions.dislikes.count}</span>
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
        )
    }
}