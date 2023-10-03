import Cookies from "universal-cookie"

import { proxy } from "valtio";

const cookies = new Cookies()
export const checkAuth = () => {
    return cookies.get("auth-token")
}

export const globalState = proxy({
  // Initialize isAuth as a reactive proxy object
  isAuth: cookies.get("auth-token"),
});