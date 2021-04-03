import React from "react"
import { Link } from "react-router-dom"

export const Welcome = () => {
    return(
        <div className="body">
            <h1>Welcome to Social Media <Link to="/login">Login</Link> / <Link to="/register">Register</Link></h1>
        </div>
    )
}