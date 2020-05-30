import { loggedUserInfo } from "./services/commonService"

// Check user logged in or not
export const isLoggedIn = () => {
    return loggedUserInfo !== null && loggedUserInfo.accessToken ? true : false
}

// Verify current url
export const isUrl = path => (
    Array.isArray(path) ? (path.indexOf(window.location.pathname) + 1 ? true : false) : (window.location.pathname === path ? true : false)
)

// Find time difference at current time by timestamp
export const compareTime = (timestamp, unit) => {
    const timeStamp = new Date(parseInt(timestamp))
    const givenDays = timeStamp / (1000 * 60 * 60 * 24)
    const currentDays = Date.now() / (1000 * 60 * 60 * 24)
    switch(unit) {
        case "minute":
            return (currentDays - givenDays).toFixed(2)

        case "hour":
            return currentDays - givenDays

        case "day":
            return (currentDays - givenDays).toFixed(2)

        case "month":
            return (currentDays - givenDays).toFixed(2)

        case "year":
            return (currentDays - givenDays).toFixed(2)
            
        default:
            return "Invalid format"
    }
}

// Covert timestamp into different time format
export const showTime = (timestamp, timeFormat) => {
    const timeObj = new Date(parseInt(timestamp))
    switch(timeFormat) {
        case "h:m 12":
            const h = timeObj.getHours()
            return (
                (h > 12 ? h % 12 : h) + ':' + timeObj.getMinutes() + (h < 12 ? ' am' : ' pm')
            )

        case "h:m:s 12":
            return timeObj.toLocaleTimeString()

        case "date-time":
            return timeObj.toDateString() + ' - ' + timeObj.toLocaleTimeString()

        case "auto":
            const year = timeObj.getFullYear()
            const month = timeObj.getMonth()
            const day = timeObj.getDay()
            const hour = timeObj.getHours()
            const minute = timeObj.getMinutes()
            const time = (hour > 12 ? hour % 12 : hour) + ':' + minute + (hour < 12 ? ' am' : ' pm')
            const date = day + ' ' + new Intl.DateTimeFormat('en-US', {month: 'short'}).format(month) + ' ' + year
            return compareTime(timestamp, 'day') >= 1 ? date + ' - ' + time : time

        case "GMT":
            return timeObj.toUTCString()
            
        default:
            return "Invalid format"
    }
}

// Current viewport width or height or {width, height}
export const screenSize = size => {
    const width = window.innerWidth
    const height = window.innerHeight
    const screenSize = { width, height }
    const getSize = size => {
        if(size && size === 'width') {
            return width
        }
        else if(size && size === 'height') {
            return height
        }
        else {
            return screenSize
        }
    }
    // window.onresize = () => {
    //     getSize(size)
    // }
    return getSize(size)
}