import { loggedUserInfo } from "../services/commonService"
import io from "socket.io-client"

const connectSocket = url => {
    return io(
        url,
        {
            forceNew: false,
            transports: ['websocket'],
            upgrade: true
        }
    )
}

export const socketConnection = loggedUserInfo ? connectSocket(`${process.env.REACT_APP_SOCKET_URL}?UID=${loggedUserInfo.id}`) : false