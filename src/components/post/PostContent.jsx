import React from "react"
import { apiBaseUrl } from "../../services/commonService"

export const PostContent = pops => {
    const attachment = pops.postContent.attachment
    return (
        <div className="post-body">
            <div className="post-text">
                <p>{pops.postContent.message}</p>
            </div>
            {(attachment.photos.length || attachment.videos.length) > 0 &&
                <div className={`post-atachment ${(attachment.photos.length || attachment.videos.length) > 1 ? 'multiple': 'single'}`}>
                    {attachment.photos.map( photo => {
                        return(
                            <div className="post-image" key={ photo._id }>
                                <img src={apiBaseUrl + photo.path} alt="PostImage" />
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
        </div>
    )
}
