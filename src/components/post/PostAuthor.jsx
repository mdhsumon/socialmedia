import React from "react"
import { apiBaseUrl } from "../../services/commonService"
import { getTime } from "../../commonActions"
import { deletePost } from "../../services/postService"
import { getUserSummary } from "../../services/userService"
import { MessagePopup } from "../common/MessagePopup"
import Popup from "../common/Popup"
import { ActionMenu, Menu } from "../common/ActionMenu"

export default class PostAuthor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            displayName: null,
            profilePhoto: null,
            messagePopup: false,
            popup: false,
        }
        getUserSummary(this.props.authorInfo.userId, data => {
            data.status && this.setState({
                username: data.users[0].username,
                displayName: data.users[0].displayName,
                profilePhoto: data.users[0].profilePhoto
            })
        })
    }
    
    removePost = postId => {
        this.setState({popup: true})
        // deletePost(postId, response => {
        //     if(response.status) {
        //         this.setState({ messagePopup: true })
        //         this.props.deletePostFlag(postId)
        //         setTimeout(() => {
        //             this.setState({
        //                 messagePopup: false
        //             })
        //         }, 4000)
        //     }
        // })
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
                            <a href={`/user/${this.state.username}`} className="author-name">{this.state.displayName}</a>
                        </div>
                        <span className="post-date-time"><i className="icon-time"></i> {getTime(this.props.postInfo.createdAt, 'auto')}</span>
                    </div>
                </div>
                <ActionMenu menuClass="post-menu" floating={false}>
                    <Menu>
                        <i className="icon-pencil-line"></i>
                        <span className="menu-text">Edit</span>
                    </Menu>
                    <Menu>
                        <i className="icon-eye-blocked"></i>
                        <span className="menu-text">Hide</span>
                    </Menu>
                    <Menu onAction={() => this.removePost(this.props.postInfo.id)}>
                        <i className="icon-remove"></i>
                        <span className="menu-text">Delete</span>
                    </Menu>
                </ActionMenu>
                {this.state.messagePopup && <MessagePopup status="success" message="Post has been Deleted" />}
                {this.state.popup && <Popup popTitle="Confirm delete" popContent="Are you sure?" />}
            </div>
        )
    }
}