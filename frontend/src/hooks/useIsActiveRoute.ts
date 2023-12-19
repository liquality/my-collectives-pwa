import { useIonRouter } from "@ionic/react";
import { useEffect } from "react";

const useIsActiveRoute = () => {
  const { routeInfo } = useIonRouter();
  
  const isActive = (path: string) => {
    return routeInfo.pathname.startsWith(path);
  };
  return isActive;
};
export default useIsActiveRoute;
