import React from 'react'
export const Bio = props => {
    return (
        <div className="common-block bio-section">
            <h4 className="block-header">About</h4>
            <div className="block-body bio-description">
                { props.bioData ? props.bioData : <div className="no-rq-item">About yourself...</div>}
            </div>
        </div>
    )
}