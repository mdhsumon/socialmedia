import React from "react";

export default class FriendRequests extends React.Component {
    constructor(props) {
        super(props);
    }
    mapData = [1,1,1,1];
    render() {
        return (
            <div className="common-block friend-request-section">
                <h4 className="block-header">Friend requests</h4>
                <div className="block-body friend-rq-items">
                    {this.mapData.map((requestItem, key) => {
                        return(
                            <div className="friend-rq-item" key={key}>
                                <div className="friend-rq-item-thumb">
                                    <img alt="alter text" src="http://localhost:2000/file/global/image/female.png" />
                                </div>
                                <div className="friend-rq-item-content">
                                    <a className="author-name" href="/">komola banu</a>
                                    <p className="mutual-f"><span className="mutual-amount">5</span> mutual friends</p>
                                    <div className="rq-buttons">
                                        <button className="accept">Accept</button>
                                        <button className="decline">Decline</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}