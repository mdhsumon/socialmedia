import React from 'react'
import ReactDOM from 'react-dom'

export default class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    static defaultProps = {
        floating: true,
        popTitle: "Popup Title",
        popContent: () => "Popup content here...",
        defaultButton: {cancel: 'Cancel', submit: 'Save'}
    }

    componentDidMount() {
        this.openPopup()
    }

    openPopup = () => {
        this.setState({ isOpen: true })
    }

    closePopup = event => {
        this.setState({ isOpen: false })
        if(this.props.onClose) {
            this.props.onClose()
        }
    }

    submitPopup = () => {
        this.setState({ isOpen: false })
        if(this.props.onSubmit) {
            this.props.onSubmit()
        }
    }

    popupHtml = () => {
        const popBtn = {...this.props.defaultButton, ...this.props.popButton}
        return(
            this.state.isOpen && <div className={`popup${this.props.popClass ? ' ' + this.props.popClass : ''}`} style={ this.state.isOpen ? {} : { display: 'none' }}>
                <div className="popup-block">
                    <div className="popup-header">
                        <div className="popup-title">{ this.props.popTitle }</div>
                        <div className="popup-close" onClick={ this.closePopup }><i className="icon-close"></i></div>
                    </div>
                    <div className="popup-body">
                        <div className="popup-content">
                            { this.props.popContent() }
                        </div>
                        <div className="popup-action">
                            <button className="button-cancel" onClick={ this.closePopup }>{popBtn.cancel}</button>
                            <button className="button-submit" onClick={ this.submitPopup }>{popBtn.submit}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return(
            this.props.floating ? ReactDOM.createPortal(this.popupHtml(), document.body) : this.popupHtml()
        )
    }
}