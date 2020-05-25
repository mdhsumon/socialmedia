import { loggedUserInfo, apiBaseUrl } from "./commonService"
const loggedUserToken = loggedUserInfo.accessToken

// Will create new post
export const createPost = (postData, callback) => {
    fetch(`${apiBaseUrl}/post/create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json'
        },
        body: postData
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { callback(false) })
}

// Will return all user posts
export const getUserPosts = (userId, callback) => {
    fetch(`${apiBaseUrl}/${userId}/posts`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { })
}

// Will return user feed
export const getUserFeeds = (userOrId, callback) => {
    fetch(`${apiBaseUrl}/${userOrId}/feeds`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => {})
}

// Will return signle post by id
export const getPostById = (postId, callback) => {
    fetch(`${apiBaseUrl}/post/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => {})
}

// Delete post by id
export const deletePost = (postId, callback) => {
    fetch(`${apiBaseUrl}/post/${postId}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${loggedUserToken}`
    }
})
.then(res => res.json())
.then(data => { callback(data) })
.catch(err => { callback(false) })
}

// Update post data
export const updatePost = (postId, postData, callback) => {
    fetch(`${apiBaseUrl}/post/${postId}`, {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer ${loggedUserToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
})
.then(res => res.json())
.then(data => { callback(data) })
.catch(err => { callback(false) })
}
