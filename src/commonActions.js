import { loggedUserInfo } from "./services/commonService"

// Check user logged in or not
export const isLoggedIn = () => {
    return loggedUserInfo !== null && loggedUserInfo.accessToken ? true : false
}

// Verify current url
export const isUrl = path => (
    Array.isArray(path) ? (path.indexOf(window.location.pathname) + 1 ? true : false) : (window.location.pathname === path ? true : false)
)

// Covert timestamp into different time format
export const convertTime = (timestamp, timeFormat) => {
    const timeObj = new Date(parseInt(timestamp))
    switch(timeFormat) {
        case "h:m 12":
            const h = timeObj.getHours()
            return (
                (h > 12 ? h % 12 : h) +
                ':' +
                timeObj.getMinutes() +
                (h < 12 ? ' AM' : ' PM')
            )

        default:
            return timeObj.getTime()
    }
}