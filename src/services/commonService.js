// Logged user info from browser
export const loggedUserInfo = localStorage.getItem("data") !== null ? JSON.parse(localStorage.getItem("data")) : false

// Api base url
export const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
