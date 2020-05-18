import React from "react"
import { screenSize } from "../commonActions"

export const Navigator = () => {
    const pages = [
        {url: '/feeds', icon: <i className="icon-feeds"></i>},
        {url: '/profile', icon: <i className="icon-profile"></i>},
        {url: '/photos', icon: <i className="icon-images"></i>},
        {url: '/videos', icon: <i className="icon-film"></i>}
    ]
    return (
        screenSize('width') > 767 &&
        <nav className="navigator">
            <div className="nav-item-container">
                {pages.map(page => (
                    <a href={page.url} className={`nav-item${window.location.pathname === page.url ? ' active' : ''}`} key={page.url}>
                        {page.icon}
                    </a>
                ))}
            </div>
        </nav>
    )
}