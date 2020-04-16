import React from 'react'
import ReactDOM from 'react-dom'

export default class Popup extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {
        this.setState({ isOpen: true })
    }

    closePopup = event => {
        this.setState({ isOpen: false })
    }

    render() {
        return ReactDOM.createPortal (
            <div className={`popup${this.props.popClas ? ' ' + this.props.popClass : ''}`} style={ this.state.isOpen ? {} : { display: 'none' }}>
                <div className="popup-block">
                    <div className="popup-header">
                        <div className="popup-title">{ this.props.popTitle }</div>
                        <div className="popup-close" onClick={ this.closePopup }>x</div>
                    </div>
                    <div className="popup-body">
                        <div className="popup-content">
                            { this.props.popContent }
                        </div>
                        <div className="popup-action">
                            <button className="button-cancel">Cancel</button>
                            <button>Save</button>
                        </div>
                    </div>
                </div>
            </div>,
            document.body
        )
    }
}