import React from "react"
import { apiBaseUrl } from "../../services/commonService"
import MediaPopup from "../common/MediaPopup"

export class PostContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPopup: false
        }
    }

    popupContent = ''

    openMedia = event => {
        this.setState({isPopup: true})
        this.popupContent = <img src={event.target.src} />
    }

    render() {
        let message, attachment
        [message, attachment] = [this.props.postContent.message, this.props.postContent.attachment]
        return (
            <div className="post-body">
                <div className="post-text">
                    <p>{message}</p>
                </div>
                {(attachment.photos.length || attachment.videos.length) > 0 &&
                    <div className={`post-atachment ${(attachment.photos.length || attachment.videos.length) > 1 ? 'multiple': 'single'}`}>
                        {attachment.photos.map( photo => {
                            return(
                                <div className="post-image" key={ photo._id }>
                                    <img src={apiBaseUrl + photo.path} alt="PostImage" onClick={(e) => this.openMedia(e)} />
                                </div>
                            )
                        })}
                        {attachment.videos.map( video => {
                            return(
                                <div className="post-video" key={ video._id }>
                                    <video width="100%" controls>
                                        <source src={apiBaseUrl + video.path} />
                                    </video>
                                </div>
                            )
                        })}
                    </div>
                }
                { this.state.isPopup && <MediaPopup onClose={() => this.setState({ isPopup: false })} mediaContent={ this.popupContent } /> }
            </div>
        )
    }
}
