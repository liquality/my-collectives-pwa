import { pathConstants } from "@/utils/routeNames";
import { IonButton, IonContent, useIonRouter } from "@ionic/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { useAccount } from "wagmi";

export interface NoGroupsProps {}

const NoGroups = ({}: NoGroupsProps) => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const router = useIonRouter();

  const handleCreateCollective = async () => {
    if (address) {
      router.push(pathConstants.mintPage.createCollective);
    } else {
      await open();
    }
  };

  return (
    <IonContent className="ion-padding">
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
