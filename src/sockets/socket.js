import { loggedUserInfo } from "../services/commonService"
import io from "socket.io-client"

const connectSocket = url => {
    return io(
        url,
        {
            forceNew: false
        }
    )
}

const connection = connectSocket(`http://localhost:8083?userId=${loggedUserInfo.userInfo.userId}`)
export const socketConnection = connection.connected ? connection : false