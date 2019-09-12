export const isLoggedIn = () => {
    const userToken = localStorage.getItem('userToken')
    return userToken ? true : false;
}
