import { useState, useEffect } from "react";
import { checkAuth } from "@/utils";

export function useCheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await checkAuth();
      setIsAuthenticated(isAuthenticated);
    };

    checkAuthentication();
  }, [isAuthenticated]);

  return isAuthenticated;
}

export default useCheckAuth;