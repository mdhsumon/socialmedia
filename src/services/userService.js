const apiBaseUrl = "http://localhost:2000";

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
