const apiBaseUrl = "http://localhost:2000";
//const userToken = localStorage.getItem('userToken');

// Will return access token after login
export const getAccessToken = (userLoginData, callback) => {
    fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLoginData)
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}

// Will return user info
export const getUserInfo = (username, accessToken, callback) => {
    fetch(`${apiBaseUrl}/user/${username}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(res => res.json())
    .then(data => {
        callback(data)
    })
}
