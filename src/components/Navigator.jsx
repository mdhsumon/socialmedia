import React from "react"
import { Link } from "react-router-dom"

export const Navigator = () => {
    return (
        <nav className="navigator">
            <div className="nav-item-container">
                <div className="nav-item active">
                    <a href="/feeds"><i className="icon-feeds"></i></a>
                </div>
                <div className="nav-item">
                    <a href="/profile"><i className="icon-profile"></i></a>
                </div>
                <div className="nav-item">
                    <Link to="/groups"><i className="icon-peoples"></i></Link>
                </div>
                <div className="nav-item">
                    <Link to="/photos"><i className="icon-camera"></i></Link>
                </div>
                <div className="nav-item">
                    <Link to="/videos"><i className="icon-movie-open"></i></Link>
                </div>
            </div>
        </nav>
    )
}