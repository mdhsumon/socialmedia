import React from 'react'
import ReactDOM from 'react-dom'

export default class MediaPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {
        this.openMedia()
    }

    openMedia = () => {
        this.setState({ isOpen: true })
    }

    closeMedia = () => {
        this.setState({ isOpen: false })
        this.props.onClose && this.props.onClose()
    }

    render() {
        return ReactDOM.createPortal (
            <div className={`media-popup${this.props.popClass ? ' ' + this.props.popClass : ''}`} style={ this.state.isOpen ? {} : { display: 'none' }}>
                <div className="media-block">
                    <div className="media-close" onClick={ this.closeMedia }><i className="icon-close"></i></div>
                    <div className="media-content">
                        { this.props.mediaContent && this.props.mediaContent }
                    </div>
                </div>
            </div>,
            document.body
        )
    }
}