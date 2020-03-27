import React from "react"
import { createPost } from "../../services/postService"
import { MessagePopup } from "../MessagePopup"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

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
            videos: null,
            visibility: 'public'
        }
    }

    handleChange = event => {
        const value = event.target.type === 'file' ? event.target.files : event.target.value
        this.setState({ [event.target.name]: value })
    }

    handleForm = event => {
        event.preventDefault()
        if(this.state.message.trim().length) {

            let postData = new FormData()
            postData.append('message', this.state.message)
            postData.append('visibility', this.state.visibility)

            if(this.state.photos != null) {
                const fileCount = this.state.photos.length
                for(let i = 0; i < fileCount; i++) {
                    postData.append('photos', this.state.photos[i])
                }
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
                        <Tabs selectedTabClassName="active" selectedTabPanelClassName="active">
                            <TabList className="post-create-tab">
                                <Tab className="tab-item message"><i className="icon-writing"></i></Tab>
                                <Tab className="tab-item photo"><i className="icon-camera"></i></Tab>
                                <Tab className="tab-item video"><i className="icon-movie-open"></i></Tab>
                            </TabList>
                            <div className="post-create-body">
                                <TabPanel className="tab-content message">
                                    <textarea name="message" placeholder="Write something here..." onChange={this.handleChange} value={this.state.message} />
                                </TabPanel>
                                <TabPanel className="tab-content photos">
                                    <div className="input-box input-file">
                                        <input type="file" name="photos" multiple onChange={this.handleChange} />
                                        <div className="input-file-text"><i className="icon-camera"></i> Upload Photos</div>
                                    </div>
                                    <div className="uploaded-files"></div>
                                </TabPanel>
                                <TabPanel className="tab-content videos">
                                    <div className="input-box input-file">
                                        <input type="file" name="videos" onChange={this.handleChange} />
                                        <div className="input-file-text"><i className="icon-movie-open"></i> Upload Videos</div>
                                    </div>
                                    <div className="uploaded-files"></div>
                                </TabPanel>
                            </div>
                            <div className="post-create-actions">
                                <button>Post now</button>
                                <span className="post-visibility">
                                    <select name="visibility" onChange={this.handleChange} >
                                        <option value="public" selected>public</option>
                                        <option value="friends">friends</option>
                                        <option value="private">private</option>
                                    </select>
                                </span>
                            </div>
                        </Tabs>
                    </form>
                </div>
                {this.state.messagePopup && <MessagePopup status="success" message="Post has been published" />}
                {this.state.isLoading && <div className="card-loader"></div>}
            </React.Fragment>
        )
    }
}