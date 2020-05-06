import { loggedUserInfo, apiBaseUrl } from "./commonService"

const loggedUserToken = loggedUserInfo.accessToken
const loggedUserId = loggedUserInfo.id

// Create new user
export const userSignup = (signupData, callback) => {
    fetch(`${apiBaseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
    .then(res => res.json())
    .then(createResponse => { callback(createResponse) })
    .catch(err => { } )
}

// Will return access token after login
export const getAccessToken = (loginData, callback) => {
    fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { } )
}

// Logout and destroy token
export const userLogout = callback => {
    fetch(`${apiBaseUrl}/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { } )
}

// Will return single user summary
export const getUserSummary = (userOrId, callback) => {
    fetch(`${apiBaseUrl}/user/summary/${userOrId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(user => { callback(user) })
    .catch(err => { } )
}

// Will return single user full information
export const getUser = (userOrId, callback) => {
    fetch(`${apiBaseUrl}/user/${userOrId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedUserToken}`
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => {  })
}

// Update profile information
export const updateUser = (profileData, callback) => {
    fetch(`${apiBaseUrl}/user/${loggedUserId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json'
        },
        body: profileData
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { } )
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
    .then(data => { callback(data.isExist ? true : false) })
    .catch(err => { } )
}

// Get friend lists
export const getFriendLists = (userOrId, callback) => {
    fetch(`${apiBaseUrl}/${userOrId}/friends`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => {  })
}

// Send friend request
export const getFriendRequests = callback => {
    fetch(`${apiBaseUrl}/${loggedUserId}/requests`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
}

// Get random friend suggestion
export const getFriendSuggestions = callback => {
    fetch(`${apiBaseUrl}/friend/suggestions`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { } )
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
    .then(data => { callback(data) })
    .catch(err => { } )
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
    .then(data => { callback(data) })
    .catch(err => { } )
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
    .then(data => { callback(data) })
    .catch(err => { } )
}

// Load messages
export const getUserMessages = (friendId, callback) => {
    fetch(`${apiBaseUrl}/messages/${friendId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(messages => { callback(messages) })
    .catch(err => { } )
}

// Send message
export const sendUserMessage = (friendId, messageData, callback) => {
    fetch(`${apiBaseUrl}/message/send`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ senderId: loggedUserId, friendId: friendId, messageData: messageData })
    })
    .then(res => res.json())
    .then(sendStatus => { callback(sendStatus) })
    .catch(err => { } )
}

// Send message
export const deleteUserMessage = (friendId, messageId, callback) => {
    fetch(`${apiBaseUrl}/message/delete`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendId: friendId, messageId: messageId })
    })
    .then(res => res.json())
    .then(deleteStatus => { callback(deleteStatus) })
    .catch(err => { })
}
