import React from "react"
import { apiBaseUrl } from "../../services/commonService"

export const PostContent = pops => {
    console.log(pops.postContent)
    const photos = pops.postContent.attachment.photos
    return (
        <div className="post-body">
            <div className="post-text">
                <p>{pops.postContent.message}</p>
            </div>
            {photos.length > 0 &&
                <div className={`post-atachment ${photos.length > 1 ? 'multiple': 'single'}`}>
                    {photos.map( photo => {
                        return(
                            <div className="post-image">
                                <img src={apiBaseUrl + photo.path} alt="PostImage" />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}
