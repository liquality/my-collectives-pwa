
export class Auth {
    static get isAuthenticated() {
        return localStorage.getItem('groupMints.accessToken') ? true : false;
    }

    static get accessToken() {
        return localStorage.getItem('groupMints.accessToken');
    }

    static get user() {
        return localStorage.getItem('groupMints.user');
    }

}
