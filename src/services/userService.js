import { loggedUserInfo, apiBaseUrl } from "./commonService";

const loggedUserToken = loggedUserInfo ? loggedUserInfo.userToken : "";
const loggedUsername = loggedUserInfo ? loggedUserInfo.userInfo.username : "";
const loggedUserId = loggedUserInfo ? loggedUserInfo.userInfo.userId : "";

// Create new user
export const userSignup = (loggedUserInfo, callback) => {
    fetch(`${apiBaseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loggedUserInfo)
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

// Will return single user summary
export const getMultipleUserSummary = (userOrIdArray, callback) => {
    fetch(`${apiBaseUrl}/multiple/user/summary/${userOrIdArray}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}

// Will return single user summary
export const getUserSummery = (userOrId, loggedUserToken = loggedUserToken, callback) => {
    fetch(`${apiBaseUrl}/user/summary/${userOrId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedUserToken}`
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

// Get friend lists
export const getFriendLists = callback => {
    fetch(`${apiBaseUrl}/${loggedUsername}/friend/list`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}

// Get random friend suggestion
export const getFriendSuggestion = callback => {
    fetch(`${apiBaseUrl}/friend/suggestion/${loggedUserId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
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
    fetch(`${apiBaseUrl}/${loggedUsername}/request/list`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
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
            'Authorization': `Bearer ${loggedUserToken}`,
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
            'Authorization': `Bearer ${loggedUserToken}`,
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
            'Authorization': `Bearer ${loggedUserToken}`,
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

// Load messages
export const getUserMessages = callback => {
    fetch(`${apiBaseUrl}/messages/${loggedUserId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(messages => {
        callback(messages)
    })
}

// Send message
export const sendMessage = (messageData, callback) => {
    fetch(`${apiBaseUrl}/message/send`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
    })
    .then(res => res.json())
    .then(sendStatus => {
        callback(sendStatus)
    })
}
