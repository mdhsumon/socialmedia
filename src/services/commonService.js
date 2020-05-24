// Logged user info from browser
export const loggedUserInfo = localStorage.getItem("data") !== null ? JSON.parse(localStorage.getItem("data")) : false

// Api base url
export const apiBaseUrl = "http://192.168.0.102:8888";