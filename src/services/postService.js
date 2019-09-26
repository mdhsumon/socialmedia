const apiBaseUrl = "http://localhost:8081";
const userData = JSON.parse(localStorage.getItem("userData"));
const userToken = userData !== null ? userData.userToken : "";

// Will create new post
export const createPost = (postData, callback) => {
    fetch(`${apiBaseUrl}/post/create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}

// Will return all user post
export const getUserPosts = (username, callback) => {
    fetch(`${apiBaseUrl}/${username}/posts`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    })
    .then(res => res.json())
    .then(data => callback(data))
}

// Will return user feed
export const getUserFeeds = (username, callback) => {
    fetch(`${apiBaseUrl}/${username}/feeds`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
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
        'Authorization': `Bearer ${userToken}`
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
        'Authorization': `Bearer ${userToken}`
    }
})
.then(res => res.json())
.then(data => callback(data))
}

// // Get column data
export const updateReaction = (column, postId, userId, callback) => {
    fetch(`${apiBaseUrl}/${column}/${postId}`, {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
        
    })
})
.then(res => res.json())
.then(data => callback(data))
}
