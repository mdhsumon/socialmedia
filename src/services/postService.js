const apiBaseUrl = "http://localhost:2000";
const userToken = localStorage.getItem('user-token')

// Will return all post by username
export const createPost = (postData) => {
    fetch(`${apiBaseUrl}/post/create`, {
        method: 'POST',

    })
}

// Will return all post by username
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

// Will return signle post by id
export const getPostById = (postId = "kuddus", callback) => {
    fetch(`${apiBaseUrl}/post/${postId}`,{
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${userToken}`
    }
})
.then(res => res.json())
.then(data => callback(data))
}
