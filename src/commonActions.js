export const isLoggedIn = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData !== null && userData.userToken ? true : false;
}
