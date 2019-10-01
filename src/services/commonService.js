// Api base url
export const apiBaseUrl = "http://10.0.40.189:8081";

// Logged user info from browser
export const loggedUserInfo = localStorage.getItem("userData") !== null ? JSON.parse(localStorage.getItem("userData")) : "";