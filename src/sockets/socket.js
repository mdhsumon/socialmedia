import { loggedUserInfo } from "../services/commonService"
import io from "socket.io-client"

const connectSocket = url => {
    return io(
        url,
        {
            forceNew: false,
            transports: ['websocket'],
            upgrade: false
        }
    )
}

export const socketConnection = loggedUserInfo ? connectSocket(`${process.env.REACT_APP_SOCKET_URL}?userId=${loggedUserInfo.id}`) : false