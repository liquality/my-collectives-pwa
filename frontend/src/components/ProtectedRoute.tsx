import { useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import { useSnapshot } from "valtio";
import { checkAuth } from "@/utils";
import { useAccount } from "wagmi";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  //const snap = useSnapshot(globalState);
  const router = useIonRouter();
  const { address } = useAccount();
  console.log(address, "Address?");

  //TODO: add check for authentication from backend here using stored JWT
  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
