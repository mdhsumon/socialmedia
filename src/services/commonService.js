// Api base url
export const apiBaseUrl = "http://localhost:8081";

// Logged user info from browser
export const userToken = localStorage.getItem("userToken") !== null ? JSON.parse(localStorage.getItem("userToken")).accessToken : "";
const accessToken =JSON.parse(localStorage.getItem("userToken")).accessToken;

// Will return logged user summary
export const loggedUserInfo = callback => {
    fetch(`${apiBaseUrl}/user/summary`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}

// Will return access token after login
export const getAccessToken = (userLoginData, callback) => {
    fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLoginData)
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
    .catch(err => {
        callback(false)
    })
}

// Will return single user summary
export const getMultipleUserSummary = (userOrIdArray, callback) => {
    fetch(`${apiBaseUrl}/multiple/user/summary/${userOrIdArray}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}
