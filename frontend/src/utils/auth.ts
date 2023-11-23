
export const AUTH_TOKEN_KEY = 'groupMints.accessToken';
export class Auth {
    static get isAuthenticated() {
        return localStorage.getItem(AUTH_TOKEN_KEY) ? true : false;
    }

    static get accessToken() {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    }

    static setAccessToken(token: string) {
        return localStorage.setItem(AUTH_TOKEN_KEY, token);
    }

    static clearAccessToken() {
        return localStorage.removeItem(AUTH_TOKEN_KEY);
    }   

}
