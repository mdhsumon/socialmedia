const apiBaseUrl = "http://localhost:2000";
const userData = JSON.parse(localStorage.getItem("userData"));
const userToken = userData !== null ? userData.userToken : "";

// Create new user
export const userSignup = (userData, callback) => {
    fetch(`${apiBaseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(createResponse => {
        callback(createResponse)
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

// Will return user summary
export const getSummeryAtLogin = (userOrId, accessToken, callback) => {
    fetch(`${apiBaseUrl}/user/summary/${userOrId}`, {
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

// Will return user summary
export const getUserSummery = (userOrId, callback) => {
    fetch(`${apiBaseUrl}/user/summary/${userOrId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        }
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}

// Will return true/false if username or email exist
export const isUserExist = (type, userOrEmail, callback) => {
    fetch(`${apiBaseUrl}/check/${type}/${userOrEmail}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        callback(data.isExist ? true : false)
    })
}

// Send friend request
export const sendFriendRequest = (username, userId, callback) => {
    fetch(`${apiBaseUrl}/${username}/request/${userId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}

// Accept friend request
export const acceptFriendRequest = (username, userId, callback) => {
    fetch(`${apiBaseUrl}/${username}/request/${userId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}
