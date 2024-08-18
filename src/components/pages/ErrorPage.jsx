import React from "react"

export const ErrorPage = () => {
    return(
        <div className="error-page" style={{ textAlign: 'center', marginTop: '200px' }}>
            <div className="error-code" style={{ fontSize: '80px' }}>404</div>
            <p>The page is not found!</p>
        </div>
    )
}