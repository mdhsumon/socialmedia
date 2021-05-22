import { loggedUserInfo, apiBaseUrl } from "./commonService"

const loggedUserToken = loggedUserInfo.accessToken
const loggedUserId = loggedUserInfo.id

// Create new user
export const userRegister = (signupData, callback) => {
    fetch(`${apiBaseUrl}/register`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
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
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
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
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { } )
}

// Will return user(s) summary
export const getUserSummary = (userOrId, callback) => {
    fetch(`${apiBaseUrl}/user/summary/${userOrId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(user => { callback(user) })
    .catch(err => { } )
}

// Will return single user full information
export const getUser = (userOrId, callback) => {
    fetch(`${apiBaseUrl}/user/${userOrId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loggedUserToken}`
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => {  })
}

// Update profile information
export const updateUser = (profileData, callback) => {
    fetch(`${apiBaseUrl}/user/${loggedUserId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json"
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
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { callback(data.status ? true : false) })
    .catch(err => { } )
}

// Get friend lists
export const getFriendLists = (userOrId, callback) => {
    fetch(`${apiBaseUrl}/friends/${userOrId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => {  })
}

// Get friend request
export const getFriendRequests = callback => {
    fetch(`${apiBaseUrl}/requests/${loggedUserId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
}

// Get sent request
export const getSentRequests = callback => {
    fetch(`${apiBaseUrl}/sents/${loggedUserId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
}

// Get random friend suggestion
export const getFriendSuggestions = callback => {
    fetch(`${apiBaseUrl}/friend/suggestion`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { } )
}

// Send friend request
export const sendFriendRequest = (userId, callback) => {
    fetch(`${apiBaseUrl}/request/send/${userId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { } )
}

// Accept friend request
export const acceptFriendRequest = (userId, callback) => {
    fetch(`${apiBaseUrl}/request/accept/${userId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { } )
}

// Decline friend request
export const declineFriendRequest = (userId, callback) => {
    fetch(`${apiBaseUrl}/request/decline/${userId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { } )
}

// Cancel friend request
export const cancelFriendRequest = (userId, callback) => {
    fetch(`${apiBaseUrl}/request/cancel/${userId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { } )
}
