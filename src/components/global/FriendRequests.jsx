import React from "react";

export default class FriendRequests extends React.Component {
    render() {
        return (
            <div className="friend-request-section">
                <h4 className="block-header">Friend requests</h4>
                <div className="friend-rq-items">
                    <div className="friend-rq-item">
                        <div className="friend-rq-item-thumb">
                            <img alt="alter text" src="img/profile-photo2.jpg" />
                        </div>
                        <div className="friend-rq-item-content">
                            <a className="author-name" href="/">komola banu</a>
                            <p className="mutual-f"><span className="mutual-amount">5</span> mutual friends</p>
                            <div className="rq-buttons">
                                <button className="accept">accept</button>
                                <button className="decline">decline</button>
                            </div>
                        </div>
                    </div>
                    <div className="friend-rq-item">
                        <div className="friend-rq-item-thumb">
                            <img alt="alter text" src="img/profile-photo2.jpg" />
                        </div>
                        <div className="friend-rq-item-content">
                            <a className="author-name" href="/">komola banu</a>
                            <p className="mutual-f"><span className="mutual-amount">5</span> mutual friends</p>
                            <div className="rq-buttons">
                                <button className="accept">accept</button>
                                <button className="decline">decline</button>
                            </div>
                        </div>
                    </div>
                    <div className="friend-rq-item">
                        <div className="friend-rq-item-thumb">
                            <img alt="alter text" src="img/profile-photo2.jpg" />
                        </div>
                        <div className="friend-rq-item-content">
                            <a className="author-name" href="/">komola banu</a>
                            <p className="mutual-f"><span className="mutual-amount">50</span> mutual friends</p>
                            <div className="rq-buttons">
                                <button className="accept">accept</button>
                                <button className="decline">decline</button>
                            </div>
                        </div>
                    </div>
                    <div className="friend-rq-item">
                        <div className="friend-rq-item-thumb">
                            <img alt="alter text" src="img/profile-photo2.jpg" />
                        </div>
                        <div className="friend-rq-item-content">
                            <a className="author-name" href="/">komola banu</a>
                            <p className="mutual-f"><span className="mutual-amount">152</span> mutual friends</p>
                            <div className="rq-buttons">
                                <button className="accept">accept</button>
                                <button className="decline">decline</button>
                            </div>
                        </div>
                    </div>
                    <div className="friend-rq-item">
                        <div className="friend-rq-item-thumb">
                            <img alt="alter text" src="img/profile-photo2.jpg" />
                        </div>
                        <div className="friend-rq-item-content">
                            <a className="author-name" href="/">komola banu</a>
                            <p className="mutual-f"><span className="mutual-amount">25</span> mutual friends</p>
                            <div className="rq-buttons">
                                <button className="accept">accept</button>
                                <button className="decline">decline</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}