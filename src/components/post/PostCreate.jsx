import React from "react"
import { createPost } from "../../services/postService"
import { MessagePopup } from "../common/MessagePopup"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export class PostCreate extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleForm = this.handleForm.bind(this)
        this.state = {
            isLoading: false,
            messagePopup: false,
            postButton: false,
            message: '',
            visibility: 'public'
        }
    }

    handleChange = event => {
        const value = event.target.type === 'file' ? event.target.files : event.target.value
        this.setState({ [event.target.name]: value }, () => {
            this.setState({
                postButton: this.state.message.trim().length || this.state.photos || this.state.videos ? true : false
            })
        })
    }

    handleForm = event => {
        event.preventDefault()
        if(this.state.message.trim().length || this.state.photos || this.state.videos) {
            let postData = new FormData()
            postData.append('message', this.state.message)
            postData.append('visibility', this.state.visibility)
            if(this.state.photos) {
                const photoCount = this.state.photos.length
                for(let i = 0; i < photoCount; i++) {
                    postData.append('photos', this.state.photos[i])
                }
            }
            if(this.state.videos) {
                const videoCount = this.state.videos.length
                for(let i = 0; i < videoCount; i++) {
                    postData.append('videos', this.state.videos[i])
                }
            }
            this.setState({
                isLoading: true
            })
            // Remove empty block form paren
            this.props.removeEmpty()
            createPost(postData, response => {
                console.log(response)
                if(response.status) {
                    this.setState({
                        message: '',
                        isLoading: false,
                        postButton: false,
                        messagePopup: true,
                        messagePopupType: "success",
                        messagePopupText: "Post has been published",
                        photos: '',
                        videos: ''
                    })
                    // Updating post from parent component
                    this.props.postCreateFlag(response.createdPost)
                }
                else {
                    this.setState({
                        isLoading: false,
                        postButton: false,
                        messagePopup: true,
                        messagePopupType: 'error',
                        messagePopupText: "Unsupported file(s)",
                    })
                }
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="post-create">
                    <form className="post-create-form" onSubmit={this.handleForm}>
                        <Tabs selectedTabClassName="active" selectedTabPanelClassName="active">
                            <TabList className="post-create-tab">
                                <Tab className="tab-item message"><i className="icon-writing"></i></Tab>
                                <Tab className="tab-item photo"><i className="icon-images"></i></Tab>
                                <Tab className="tab-item video"><i className="icon-films"></i></Tab>
                            </TabList>
                            <div className="post-create-body">
                                <TabPanel className="tab-content message">
                                    <textarea name="message" placeholder="Write something here..." onChange={this.handleChange} value={this.state.message} />
                                </TabPanel>
                                <TabPanel className="tab-content photos">
                                    <div className="input-box input-file">
                                        <input type="file" name="photos" multiple onChange={this.handleChange} />
                                        <div className="input-file-text"><i className="icon-images"></i> Upload Photos</div>
                                    </div>
                                    <div className="uploaded-files"></div>
                                </TabPanel>
                                <TabPanel className="tab-content videos">
                                    <div className="input-box input-file">
                                        <input type="file" name="videos" multiple onChange={this.handleChange} />
                                        <div className="input-file-text"><i className="icon-films"></i> Upload Videos</div>
                                    </div>
                                    <div className="uploaded-files"></div>
                                </TabPanel>
                            </div>
                            <div className="post-create-actions">
                                <button disabled={!this.state.postButton && true}>Post now</button>
                                <span className="post-visibility">
                                    <select name="visibility" defaultValue="public" onChange={this.handleChange} title="Post visibility" disabled={!this.state.postButton && 'disabled'}>
                                        <option value="public">Public</option>
                                        <option value="friends">For Friends</option>
                                        <option value="private">Private</option>
                                    </select>
                                </span>
                            </div>
                        </Tabs>
                    </form>
                </div>
                {this.state.messagePopup && <MessagePopup status={this.state.messagePopupType} message={this.state.messagePopupText} />}
                {this.state.isLoading && <div className="card-loader"></div>}
            </React.Fragment>
        )
    }
}