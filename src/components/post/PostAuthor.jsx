import React from "react"
import { apiBaseUrl } from "../../services/commonService"
import { deletePost } from "../../services/postService"
import { getUserSummery } from "../../services/userService"
import { MessagePopup } from "../common/MessagePopup"

export default class PostAuthor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            displayName: null,
            profilePhoto: null,
            messagePopup: false
        }
        getUserSummery(this.props.authorInfo.userId, data => {
            this.setState({
                username: data.username,
                displayName: data.displayName,
                profilePhoto: data.profilePhoto
            })
        })
    }
    
    removePost = postId => {
        deletePost(postId, response => {
            if(response.deleteStatus) {
                this.setState({ messagePopup: true })
                this.props.deletePostFlag(postId)
                setTimeout(() => {
                    this.setState({
                        messagePopup: false
                    })
                }, 4000)
            }
        })
    }

    render() {
        return (
            <div className="post-author">
                <div className="author-post-detail">
                    <div className="post-author-thumb">
                        <img src={apiBaseUrl + this.state.profilePhoto} alt={this.state.displayName} />
                    </div>
                    <div className="author-post-info">
                        <div className="author-post_info">
                            <a href={this.state.username} className="author-name">{this.state.displayName}</a>
                        </div>
                        <span className="post-date-time">at {this.props.postInfo.createdAt}</span>
                    </div>
                </div>
                <button className="action-button" onClick={ e => this.removePost(this.props.postInfo.id) }><i className="icon-ellips-h"></i></button>
                {this.state.messagePopup && <MessagePopup status="success" message="Post has been Deleted" />}
            </div>
        )
    }
}