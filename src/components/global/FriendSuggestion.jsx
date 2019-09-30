import React from "react"
import { Link } from "react-router-dom"
import { apiBaseUrl } from "../../services/commonService"
import { getFriendSuggestion, sendFriendRequest } from "../../services/userService"

export default class FriendSuggestion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: false,
            isRemoving: false,
            suggestionList: []
        }
    }

    componentDidMount() {
        this.getSuggestions()
    }

    getSuggestions = () => {
        getFriendSuggestion(response => {
            this.setState({suggestionList: response})
        })
    }

    sendRequest = (userInfo, event) => {
        sendFriendRequest(userInfo.username, response => {
            const currentList = [...this.state.suggestionList]
            const findItem = currentList.indexOf(userInfo)
            if(response.requestStatus) {
                currentList.splice(findItem, 1)
                this.setState({
                    suggestionList: currentList
                })
            }
        })
    }

    removeSuggestion = (userInfo, event) => {
        const currentList = [...this.state.suggestionList]
        const findItem = currentList.indexOf(userInfo)
        if(findItem !== -1) {
            currentList.splice(findItem, 1)
            this.setState({
                suggestionList: currentList
            })
        }
    }

    renderSuggestion = () => {
        if(this.state.suggestionList.length){
            return (
                this.state.suggestionList.map(userInfo => {
                    return(
                        <div className="friend-rq-item" key={userInfo.userId}>
                            <div className="friend-rq-item-thumb">
                                <img alt={userInfo.displayName} src={apiBaseUrl + userInfo.profilePhoto} />
                            </div>
                            <div className="friend-rq-item-content">
                                <Link className="author-name" to={userInfo.username}>{userInfo.displayName}</Link>
                                <p className="mutual-f"><span className="mutual-amount">5</span> mutual friends</p>
                                <div className="rq-buttons">
                                    <button className="accept" onClick={this.sendRequest.bind(this, userInfo)}>Send Request</button>
                                    <button className="decline" onClick={this.removeSuggestion.bind(this, userInfo)}>x</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
        else {
            return(
                <div className="no-rq-item">
                    No suggestion found
                </div>
            )
        }
    }

    render() {
        return (
            <div className="common-block friend-request-section">
                <h4 className="block-header">People You May Know</h4>
                <div className="block-body friend-rq-items">
                    {this.renderSuggestion()}
                </div>
            </div>
        )
    }
}