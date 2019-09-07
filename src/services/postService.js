const apiBaseUrl = "http://localhost:2000";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt1ZGR1c0BtYWlsLmNvbSIsImlhdCI6MTU2Nzg0NDc4NywiZXhwIjoxNTY3ODg3OTg3fQ.jv-8y6y2WroN-wvr8fPN9NAplHjpuPX0srX547YboMI";

// Will return all post by username
export const getUserPosts = (username = "kuddus", callback) => {
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
