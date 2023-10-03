import Cookies from "universal-cookie"

const cookies = new Cookies()
export const checkAuth = () => {
    return cookies.get("auth-token")
}