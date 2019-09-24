const apiBaseUrl = "http://localhost:2000";

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

// Will return user info
export const getUserInfo = (username, accessToken, callback) => {
    fetch(`${apiBaseUrl}/user/${username}`, {
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
