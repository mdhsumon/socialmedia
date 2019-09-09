export const isLoggedIn = () => {
    const userToken = localStorage.getItem('user-token')
    return userToken ? true : false;
}
