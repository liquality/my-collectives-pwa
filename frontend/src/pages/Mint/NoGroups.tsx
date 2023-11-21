import Header from "@/components/Header";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import { routes } from "@/utils/routeNames";
import {
  IonButton,
  IonContent,
  IonItem,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useAccount } from "wagmi";

export interface NoGroupsProps {}

const NoGroups: React.FC<RouteComponentProps> = ({ match }) => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { fetchUserGroups } = useGetMyGroups();
  const router = useIonRouter();

  const handleCreateCollective = async () => {
    if (address) {
      router.push(routes.mintPage.createCollective);
    } else {
      await open();
    }
  };

  return (
    <IonPage>
      <Header title="Mint" />
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
    </IonPage>
  );
};

export default NoGroups;
