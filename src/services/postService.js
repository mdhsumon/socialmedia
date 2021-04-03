import { loggedUserInfo, apiBaseUrl } from "./commonService"
const loggedUserToken = loggedUserInfo.accessToken

// Will create new post
export const createPost = (postData, callback) => {
    fetch(`${apiBaseUrl}/post`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json"
        },
        body: postData
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { callback(false) })
}

// Will return logged user posts
export const getPosts = callback => {
    fetch(`${apiBaseUrl}/posts`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { })
}

// Will return logged user feeds
export const getFeeds = callback => {
    fetch(`${apiBaseUrl}/feeds`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => {})
}

// Will return other user posts
export const getUserPosts = (userOrId, callback) => {
    fetch(`${apiBaseUrl}/posts/${userOrId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => { })
}

// Will return signle post by id
export const getPostById = (postId, callback) => {
    fetch(`${apiBaseUrl}/post/${postId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`
        }
    })
    .then(res => res.json())
    .then(data => { callback(data) })
    .catch(err => {})
}

// Update post data
export const updatePost = (postId, postData, callback) => {
    fetch(`${apiBaseUrl}/post/${postId}`, {
    method: "PUT",
    headers: {
        "Authorization": `Bearer ${loggedUserToken}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
})
.then(res => res.json())
.then(data => { callback(data) })
.catch(err => { callback(false) })
}

// Delete post by id
export const deletePost = (postId, callback) => {
    fetch(`${apiBaseUrl}/post/${postId}`, {
    method: "DELETE",
    headers: {
        "Authorization": `Bearer ${loggedUserToken}`
    }
})
.then(res => res.json())
.then(data => { callback(data) })
.catch(err => { callback(false) })
}
