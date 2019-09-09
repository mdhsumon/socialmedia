const apiBaseUrl = "http://localhost:2000";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhZ2xhQGVtYWlsLmNvbSIsImlhdCI6MTU2ODAxMDUxNywiZXhwIjoxNTY4MDUzNzE3fQ.4ITl66yuGszcAAdsIGP-yEaSBMdq0RuOPRL9zvF1t2k";

// Will return all post by username
export const createPost = (postData) => {
    fetch(`${apiBaseUrl}/post/create`, {
        method: 'POST',

    })
}

// Will return all post by username
export const getUserPosts = (username, callback) => {
    fetch(`${apiBaseUrl}/${username}/posts`,{
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
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
        'Authorization': `Bearer ${token}`
    }
})
.then(res => res.json())
.then(data => callback(data))
}
