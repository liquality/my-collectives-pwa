import { useState, useEffect } from "react";
import { Auth } from "@/utils";

export function useCheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      setIsAuthenticated(Auth.isAuthenticated);
    };

    checkAuthentication();
  }, [isAuthenticated]);

  return isAuthenticated;
}

export default useCheckAuth;