// Api base url
export const apiBaseUrl = "http://localhost:8888";

// Logged user info from browser
export const loggedUserInfo = localStorage.getItem("userData") !== null ? JSON.parse(localStorage.getItem("userData")) : false;