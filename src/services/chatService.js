import { loggedUserInfo, apiBaseUrl } from "./commonService"

const loggedUserToken = loggedUserInfo.accessToken
const loggedUserId = loggedUserInfo.id

// Load messages
export const getUserMessages = (friendId, callback) => {
    fetch(`${apiBaseUrl}/messages/${friendId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(messages => { callback(messages) })
    .catch(err => { } )
}

// Send message
export const sendUserMessage = (friendId, messageData, callback) => {
    fetch(`${apiBaseUrl}/message`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ friendId: friendId, message: messageData })
    })
    .then(res => res.json())
    .then(sendStatus => { callback(sendStatus) })
    .catch(err => { } )
}

// Send message
export const deleteUserMessage = (friendId, messageId, callback) => {
    fetch(`${apiBaseUrl}/message/delete`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${loggedUserToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ friendId: friendId, messageId: messageId })
    })
    .then(res => res.json())
    .then(deleteStatus => { callback(deleteStatus) })
    .catch(err => { })
}
