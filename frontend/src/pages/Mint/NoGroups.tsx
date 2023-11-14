import { IonButton, IonContent, IonItem, IonPage } from "@ionic/react";
import { useAccount } from "wagmi";

export interface NoGroupsProps {}

const NoGroups = ({}: NoGroupsProps) => {
  const { address } = useAccount();

  const handleCreateCollective = () => {
    //TODO: handle routing and/or connect wallet here
    //route.push(/createCollective)
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
