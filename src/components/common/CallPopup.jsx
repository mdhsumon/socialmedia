import React from 'react'
import ReactDOM from 'react-dom'
import { getMediaStream } from '../../commonActions'
import { apiBaseUrl, loggedUserInfo } from '../../services/commonService'
import { socketConnection } from '../../sockets/socket'

export default class CallPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    static defaultProps = {
        floating: true,
        popTitle: "Calling",
        popContent: () => "Popup content here..."
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

    makeCall = (callType, calleeId) => {
        if(callType === "audio") {
            getMediaStream("camera", async response => {
                if(response.status) {
                    const config = {iceServers: [{"urls": "stun:stun.l.google.com:19302"}]}
                    const peerConnect = new RTCPeerConnection(config)
                    peerConnect.addStream(response.data)
                    // response.media.getTracks().forEach(track => {
                    //     peerConnect.addTrack(track, response.data)
                    // })
                    const callOffer = await peerConnect.createOffer({OfferToReceiveAudio: true})
                    await peerConnect.setLocalDescription(callOffer)
                    socketConnection.emit("userCall", calleeId, loggedUserInfo.id, {"offer": callOffer})
                    console.log("1 - offer")

                    // Get callee answer
                    socketConnection.on("receiveCall", async (calleeId, res) => {
                        if(res.answer) {
                            const remoteDesc = new RTCSessionDescription(res.answer)
                            await peerConnect.setRemoteDescription(remoteDesc)
                            console.log("2 - answer")
                        }
                        else if(res.newCandidate) {
                            console.log("Receive Can from A")
                            await peerConnect.addIceCandidate(res.newCandidate)
                        }
                    })
                    // Connection status
                    peerConnect.onconnectionstatechange = e => {
                        console.log('State A', peerConnect.connectionState)
                        if(peerConnect.connectionState === "connected") {
                            console.log("Peers connection established!")
                        }
                    }
                    const player = document.querySelector('#demo-video')
                    peerConnect.ontrack = track => {
                        console.log('M Track', track.streams[0])
                        player.srcObject = track.streams[0]
                    }
                }
                else {
                    console.log("Media permission denied", response.error)
                }
            })
        }
    }

    receiveCall = () => {
        
    }

    popupHtml = () => {
        const userId = this.props.userId
        return(
            this.state.isOpen && <div className={`popup${this.props.popClass ? ' ' + this.props.popClass : ''}`} style={ this.state.isOpen ? {} : { display: 'none' }}>
                <div className="popup-block">
                    <div className="popup-header">
                        <div className="popup-title">{ this.props.popTitle }</div>
                        <div className="popup-close" onClick={ this.closePopup }><i className="icon-close"></i></div>
                    </div>
                    <div className="popup-body">
                        <div className="popup-content">
                            <div className="calling-body">
                                <div className="user">
                                    {/* <img src={apiBaseUrl + callee.profilePhoto} alt={callee.displayName}/> */}
                                    <video id="demo-video" controls playsInline={true} autoPlay={true}></video>
                                    {/* <audio id="demo-audio" controls playsInline={true} autoPlay={true}></audio> */}
                                </div>
                                <button onClick={this.openCamera}>Camera</button>
                                <button className="call-button" onClick={() => this.makeCall("audio", userId)}>Call</button>
                                <button className="call-button" onClick={() => this.receiveCall()}>Receive Call</button>
                            </div>
                            {/* { this.props.popContent() } */}
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