import React from "react"
import { apiBaseUrl, loggedUserInfo } from "../../services/commonService"
import { showTime } from "../../commonActions"
import { deletePost } from "../../services/postService"
import { getUserSummary } from "../../services/userService"
import { MessagePopup } from "../common/MessagePopup"
import Popup from "../common/Popup"
import { ActionMenu, Menu } from "../common/ActionMenu"

export default class PostAuthor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authorInfo: {},
            messagePopup: false,
            popup: false,
        }
        getUserSummary(this.props.postInfo.author.userId, data => {
            data.status && this.setState({
                authorInfo: {
                    userId: data.users[0]._id,
                    username: data.users[0].username,
                    displayName: data.users[0].displayName,
                    profilePhoto: data.users[0].profilePhoto,
                    coverPhoto: data.users[0].coverPhoto
                }
            })
        })
    }
    
    openPopup = () => {
        this.setState({popup: true})
    }
    
    removePost = postId => {
        deletePost(postId, response => {
            if(response.status) {
                // Update parent
                this.props.deletePostFlag(postId)
            }
        })
    }

    closePopup = () => {
        this.setState({popup: false})
    }

    render() {
        const [post, author] = [this.props.postInfo, this.state.authorInfo]
        return (
            <div className="post-author">
                <div className="author-post-detail">
                    <div className="post-author-thumb">
                        <img src={apiBaseUrl + author.profilePhoto} alt={author.displayName} />
                    </div>
                    <div className="author-post-info">
                        <div className="author-post_info">
                            <a href={`/user/${author.username}`} className="author-name">{author.displayName}</a>
                        </div>
                        <span className="post-date-time"><i className="icon-time"></i> {showTime(post.createdAt, 'auto')}</span>
                    </div>
                </div>
                {loggedUserInfo.id === author.userId &&
                    <ActionMenu menuClass="post-menu">
                        <Menu>
                            <i className="icon-pencil-line"></i>
                            <span className="menu-text">Edit</span>
                        </Menu>
                        <Menu>
                            <i className="icon-eye-blocked"></i>
                            <span className="menu-text">Make private</span>
                        </Menu>
                        <Menu onAction={() => this.openPopup(post.id)}>
                            <i className="icon-remove"></i>
                            <span className="menu-text">Delete</span>
                        </Menu>
                    </ActionMenu>
                }
                {this.state.messagePopup && <MessagePopup status="success" message="Post has been deleted" />}
                {this.state.popup &&
                <Popup
                    onSubmit={() => this.removePost(post.id)}
                    onClose={this.closePopup}
                    popClass="confirm-popup"
                    popButton={{submit: 'Yes'}}
                    popTitle="Confirm delete"
                    popContent={() => "Are you sure? It will be deleted permanently! You can hide the post for now."}
                />}
            </div>
        )
    }
}