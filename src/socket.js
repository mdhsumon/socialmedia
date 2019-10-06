import socketIOclient from "socket.io-client"
import { loggedUserInfo } from "./services/commonService"

export const socketConnection = socketIOclient(`http://localhost:8083?userId=${loggedUserInfo.userInfo.userId}`)

