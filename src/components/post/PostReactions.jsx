import React from "react"
import { updatePost } from "../../services/postService"
import { loggedUserInfo } from "../../services/commonService"

export class PostReactions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLiked: false,
            isEmojify: false,
            reactCount: this.props.reactions.count,
            reactedUsers: [...this.props.reactions.likes, ...this.props.reactions.emojis],
            userComment: ''
        }
    }
    componentDidMount() {
        this.reactionStatus()
    }
    reactionStatus = () => {
        const isReacted = this.state.reactedUsers.filter(user => user.userId === loggedUserInfo.id)[0]
        isReacted && this.setState({reactData: isReacted.data}) &&
        (isReacted.data === "like" ? this.setState({isLiked: true}) : this.setState({isEmojify: true}))
    }
    manageReaction = type => {
        const actionData = {
            area: "react",
            action: type,
            data: type === "like" ? "like" : "128525"
        }
        updatePost(this.props.postInfo.id, actionData, response => {
            if(response.status) {
                type === "like" ?
                this.setState({isLiked: !this.state.isLiked, isEmojify: false}) :
                this.setState({isEmojify: !this.state.isEmojify, isLiked: false})
                this.setState({reactCount: response.count})
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
        console.log(this.state.reactData)
        return (
            <div className="lcs-section">
                <div className="like-dislike">
                    <span className={`react like${this.state.isLiked ? ' done' : ''}`} onClick={() => this.manageReaction('like')}>
                        <i className="icon-like"></i>
                    </span>
                    <span className={`react emoji${this.state.isEmojify ? ' done' : ''}`} onClick={() => this.manageReaction('emoji')}>
                        {this.state.reactData && this.state.reactData !== "like" ? (String.fromCodePoint(parseInt("128525"))) : <i className="icon-smile-fill"></i>}
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