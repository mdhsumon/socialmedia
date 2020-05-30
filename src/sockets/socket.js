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

export const socketConnection = loggedUserInfo ? connectSocket(`http://localhost:8083?userId=${loggedUserInfo.id}`) : false