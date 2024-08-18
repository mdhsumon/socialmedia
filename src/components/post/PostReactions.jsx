import React from "react"
import { updatePost } from "../../services/postService"
import { loggedUserInfo } from "../../services/commonService"
import { ActionMenu, Menu } from "../common/ActionMenu"

export class PostReactions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
        if(isReacted) {
            this.setState({reactData: isReacted.data})
            isReacted.data === "like" ? this.setState({isLiked: true}) : this.setState({isEmojify: true})
        }
    }
    manageReaction = code => {
        const submitData = { area: "react", data: code }
        updatePost(this.props.postInfo.id, submitData, response => {
            if(response.status) {
                this.setState({
                    reactData: this.state.reactData !== code ? code : null,
                    reactCount: response.count
                })
            }
        })
    }
    handleComment = event => {
        if (event.key === "Enter") {
            if (this.state.userComment.trim().length) {
                updatePost(
                    this.props.postInfo.id,
                    { area: "comment", action: "add", data: this.state.userComment },
                    comRes => {
                        if (comRes.status) {
                            // Comment signal goes here
                        }
                    }
                )
            }
        }
        else this.setState({userComment: event.target.value})
    }
    render() {
        const reaction = this.state.reactData
        const emojis = ["128150", "128525", "128516", "128578", "128545"]
        return (
            <div className="lcs-section">
                <div className="like-dislike">
                    <span className={`react like${reaction && reaction === "like" ? " done" : ""}`} onClick={() => this.manageReaction("like")}>
                        <i className="icon-like"></i>
                    </span>
                    <div className={`react emoji${reaction && reaction !== "like" ? " done" : ""}`}>
                        <ActionMenu
                        menuIcon={reaction && reaction !== "like" ? String.fromCodePoint(reaction) : <i className="icon-smile-fill"></i>}
                        menuClass="emojis"
                        itemClass="emo"
                        >
                            {emojis.map(emo => <Menu onAction={() => this.manageReaction(emo)} key={emo}>{String.fromCodePoint(emo)}</Menu>)}
                        </ActionMenu>
                    </div>
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