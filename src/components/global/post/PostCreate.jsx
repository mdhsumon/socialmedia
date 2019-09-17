import React from "react";
import { createPost } from "../../../services/postService";
import { MessagePopup } from "../../MessagePopup";

export class PostCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            visibility: 'public',
            messagePopup: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleForm = event => {
        event.preventDefault();
        if(true) {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const postData = {
                userId: userData.userInfo.userId,
                username: userData.userInfo.username,
                displayName: userData.userInfo.displayName,
                content: this.state.content,
                visibility: this.state.visibility
            }
            createPost(postData, status => {
                if(status) {
                    this.setState({
                        messagePopup: true
                    });

                    // Updating state from parent component
                    this.props.postCreateFlag();

                    setTimeout(() => {
                        this.setState({
                            content: '',
                            visibility: 'public',
                            messagePopup: false
                        })
                    }, 3000);
                }
            })
        }
    }

    render() {
        return (
            <div className="post-create">
                <form className="post-create-form" onSubmit={this.handleForm}>
                    <div className="post-create-tab">
                        <div className="tab-item message">Message </div>
                        <div className="tab-item photo">Photo </div>
                        <div className="tab-item video">Video</div>
                    </div>
                    <div className="post-create-body">
                        <textarea name="content" placeholder="Write something here..." onChange={this.handleChange} />
                    </div>
                    <div className="post-create-actions">
                        <button>Post now</button>
                        <span className="post-visibility">
                            <select name="visibility" onChange={this.handleChange} >
                                <option value="public">p</option>
                                <option value="friends">f</option>
                                <option value="me">m</option>
                            </select>
                        </span>
                    </div>
                </form>
                {this.state.messagePopup && <MessagePopup status="success" message="Post has been published" />}
            </div>
        )
    }
}