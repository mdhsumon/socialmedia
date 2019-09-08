const apiBaseUrl = "http://localhost:2000";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt1ZGR1c0BtYWlsLmNvbSIsImlhdCI6MTU2Nzk2MDgwNywiZXhwIjoxNTY4MDA0MDA3fQ.ib9U_fsf-FaCzS0Q49L-PrY05b-OMXqEluh76KFx4Ho";

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
