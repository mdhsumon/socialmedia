import { loggedUserInfo } from "./services/commonService";

export const isLoggedIn = () => {
    return loggedUserInfo !== null && loggedUserInfo.accessToken ? true : false
}