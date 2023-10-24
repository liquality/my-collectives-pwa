
export const checkAuth = (): boolean => {
    return localStorage.getItem('groupMints.accessToken') ? true : false;
}
