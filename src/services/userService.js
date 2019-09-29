import { userToken, loggedUserInfo, apiBaseUrl } from "./commonService";

let loggedUsername, loggedUserId;
loggedUserInfo(data => {
    loggedUsername = data.username;
    loggedUserId = data.userId;
})

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

// Get random friend suggestion
export const getFriendSuggestion = callback => {
    fetch(`${apiBaseUrl}/friend/suggestion/${loggedUserId}`, {
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

// Send friend request
export const getFriendRequests = callback => {
    fetch(`${apiBaseUrl}/request/list`, {
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

// Send friend request
export const sendFriendRequest = (username, callback) => {
    fetch(`${apiBaseUrl}/request/send`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({toUser: username, senderId: loggedUserId})
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}

// Accept friend request
export const acceptFriendRequest = (userId, callback) => {
    fetch(`${apiBaseUrl}/request/accept`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({senderId: userId})
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}

// Accept friend request
export const declineFriendRequest = (userId, callback) => {
    fetch(`${apiBaseUrl}/request/decline`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({senderId: userId})
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}
