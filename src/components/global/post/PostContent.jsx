import React from "react";

export const PostContent = (pops) => {
    return (
        <div className="post-body">
            <div className="post-text">
                <p>{pops.postContent.message}</p>
            </div>
                {pops.postContent.attachment.length > 0 &&
                    <div className="post-image">
                        <img alt="PostImage" src="" />
                    </div>
                }
        </div>
    )
}
