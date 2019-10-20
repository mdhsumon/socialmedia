import { loggedUserInfo, apiBaseUrl } from "./commonService";

const loggedUserToken = loggedUserInfo.userToken;

// Will create new post
export const createPost = (postData, callback) => {
    fetch(`${apiBaseUrl}/post/create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: postData
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}

// Will return all user posts
export const getUserPosts = (userId, callback) => {
    fetch(`${apiBaseUrl}/posts/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`
        }
    })
    .then(res => res.json())
    .then(data => callback(data))
}

// Will return user feed
export const getUserFeeds = (userId, callback) => {
    fetch(`${apiBaseUrl}/feeds/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${loggedUserToken}`
        }
    })
    .then(res => res.json())
    .then(data => callback(data))
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
.then(data => callback(data))
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
.then(data => callback(data))
}

// Get column data
export const updatePost = (postId, postData, callback) => {
    console.log(postData)
    fetch(`${apiBaseUrl}/post/${postId}`, {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer ${loggedUserToken}`,
        'Accept': 'application/json'
    },
    body: JSON.stringify(postData)
})
.then(res => res.json())
.then(data => callback(data))
}
