import React from "react"
import { loggedUserInfo } from "../../services/commonService"
import { createPost } from "../../services/postService"
import { MessagePopup } from "../MessagePopup"

export class PostCreate extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleForm = this.handleForm.bind(this)
        this.state = {
            isLoading: false,
            messagePopup: false,
            message: '',
            photos: null,
            videos: null
        }
    }

    handleChange = event => {
        this.setState({
            message: event.target.value,
            photos: event.target.files,
            videos: event.target.files
        })
    }

    handleForm = event => {
        event.preventDefault()
        if(this.state.message.trim().length || true) {
            const postData = {
                userId: loggedUserInfo.userInfo.userId,
                username: loggedUserInfo.userInfo.username,
                message: this.state.message,
                photos: this.state.photos,
                visibility: this.state.visibility
            }
            this.setState({
                isLoading: true
            })
            
            // Remove empty block form paren
            this.props.removeEmpty()

            createPost(postData, response => {
                if(response.createStatus) {
                    this.setState({
                        message: '',
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
                            <div className="tab-item message"><i className="icon-writing"></i></div>
                            <div className="tab-item photo active"><i className="icon-camera"></i></div>
                            <div className="tab-item video"><i className="icon-movie-open"></i></div>
                        </div>
                        <div className="post-create-body">
                            <div className="message" style={{display: 'none'}}>
                                <textarea name="message" placeholder="Write something here..." onChange={this.handleChange} value={this.state.message} />
                            </div>
                            <div className="photos">
                                <div className="input-box input-file">
                                    <input type="file" name="photos" onChange={this.handleChange} />
                                    <div className="input-file-text"><i className="icon-camera"></i> Upload Photos</div>
                                </div>
                                <div className="uploaded-files"></div>
                            </div>
                            <div className="videos" style={{display: 'none'}}>
                                <div className="input-box input-file">
                                    <input type="file" name="videos" onChange={this.handleChange} />
                                    <div className="input-file-text"><i className="icon-movie-open"></i> Upload Videos</div>
                                </div>
                                <div className="uploaded-files"></div>
                            </div>
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