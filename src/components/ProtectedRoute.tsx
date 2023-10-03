import { useEffect } from "react";
import { useIonRouter } from '@ionic/react';
import { useSnapshot } from "valtio";
import { globalState, checkAuth,  } from "@/utils";

const ProtectedRoute = ({ children }) => {
  //const snap = useSnapshot(globalState);
  const router = useIonRouter();

  useEffect(() => {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) {
      router.push("/");
    }
  }, []);

  return children;
};

export default ProtectedRoute;