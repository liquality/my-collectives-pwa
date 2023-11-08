import { useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import { useAccount } from "wagmi";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const router = useIonRouter();
  const { address } = useAccount();

  //TODO: add check for authentication from backend here using stored JWT
  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
