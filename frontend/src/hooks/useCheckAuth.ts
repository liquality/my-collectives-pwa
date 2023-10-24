import { useState, useEffect } from "react";
import { checkAuth } from "@/utils";

export function useCheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = checkAuth();
      setIsAuthenticated(isAuthenticated);
    };

    checkAuthentication();
  }, [isAuthenticated]);

  return isAuthenticated;
}

export default useCheckAuth;