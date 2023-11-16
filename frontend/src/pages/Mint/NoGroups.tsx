import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import { IonButton, IonContent, IonItem, IonPage } from "@ionic/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export interface NoGroupsProps {}

const NoGroups = ({}: NoGroupsProps) => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { fetchUserGroups } = useGetMyGroups();

  useEffect(() => {
    if (isConnected) {
      fetchUserGroups();
    }
  }, [isConnected]);

  const handleCreateCollective = async () => {
    //TODO: handle routing and
    if (address) {
      //route.push(/createCollective)
    } else {
      await open();
    }
  };

  return (
    <IonContent>
      <div className="purple-container">
        <p className="purple-container-text mb-1">
          To find previous collected content and Collective connect the same
          wallet.
        </p>
        <br></br>
        <IonButton
          onClick={handleCreateCollective}
          shape="round"
          color="primary"
        >
          {address ? "Create Collective" : "Connect"}
        </IonButton>
      </div>
    </IonContent>
  );
};

export default NoGroups;
