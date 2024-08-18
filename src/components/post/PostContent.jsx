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
        this.popupContent = <img src={event.target.src} alt={event.target.alt} />
    }

    render() {
        const [message, attachment] = [this.props.postContent.message, this.props.postContent.attachment]
        const photoCount = attachment.photos.length, videoCount = attachment.videos.length
        return (
            <div className="post-body">
                {message.length > 0 && <div className="post-text">
                    {message}
                </div>}
                {(photoCount || videoCount) > 0 &&
                    <div className={`post-atachment ${(photoCount || videoCount) > 1 ? "multiple": "single"}`}>
                        {attachment.photos.map((photo , key) => {
                            return(
                                <div className={`post-image${photoCount > 2 && key === 0 && photoCount % 2 ? " full-width" : ''}`} key={ photo._id }>
                                    <img src={apiBaseUrl + photo.path} alt="Post Avatar" onClick={(e) => this.openMedia(e)} />
                                </div>
                            )
                        })}
                        {attachment.videos.map((video, key) => {
                            return(
                                <div className={`post-image${videoCount > 2 && key === 0 && videoCount % 2 && " full-width"}`} key={ video._id }>
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
