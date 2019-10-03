import React from "react"
import { createPost } from "../../services/postService"
import { MessagePopup } from "../MessagePopup"

export class PostCreate extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleForm = this.handleForm.bind(this)
        this.state = {
            isLoading: false,
            messagePopup: false
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleForm = event => {
        event.preventDefault()
        if(true) {
            const userData = JSON.parse(localStorage.getItem("userData"))
            const postData = {
                userId: userData.userInfo.userId,
                username: userData.userInfo.username,
                displayName: userData.userInfo.displayName,
                profilePhoto: userData.userInfo.profilePhoto,
                content: this.state.content,
                visibility: this.state.visibility
            }
            this.setState({
                isLoading: true
            })
            
            // Remove empty form paren
            this.props.removeEmpty()

            createPost(postData, response => {
                if(response.status) {
                    this.setState({
                        isLoading: false,
                        messagePopup: true
                    })

                    // Updating post from parent component
                    this.props.postCreateFlag(response.createdPost)
                    setTimeout(() => {
                        this.setState({
                            messagePopup: false
                        })
                    }, 3000)
                }
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="post-create">
                    <form className="post-create-form" onSubmit={this.handleForm}>
                        <div className="post-create-tab">
                            <div className="tab-item message active"><i className="icon-writing"></i></div>
                            <div className="tab-item photo"><i className="icon-camera"></i></div>
                            <div className="tab-item video"><i className="icon-movie-open"></i></div>
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
                                    <option value="private">m</option>
                                </select>
                            </span>
                        </div>
                    </form>
                </div>
                {this.state.messagePopup && <MessagePopup status="success" message="Post has been published" />}
                {this.state.isLoading && <div className="card-loader"></div>}
            </React.Fragment>
        )
    }
}