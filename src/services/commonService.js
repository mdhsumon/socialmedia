// Api base url
export const apiBaseUrl = "http://192.168.0.100:8888";

// Logged user info from browser
export const loggedUserInfo = localStorage.getItem("data") !== null ? JSON.parse(localStorage.getItem("data")) : false;