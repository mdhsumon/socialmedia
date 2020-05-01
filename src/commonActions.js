import { loggedUserInfo } from "./services/commonService";

export const isLoggedIn = () => {
    return loggedUserInfo !== null && loggedUserInfo.accessToken ? true : false
}

// Verify current url
export const isUrl = path => (
    Array.isArray(path) ? (path.indexOf(window.location.pathname) + 1 ? true : false) : (window.location.pathname === path ? true : false)
)