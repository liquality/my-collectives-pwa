import { IonContent, IonPage } from "@ionic/react";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import MintTopBar from "@/components/Mint/MintTopBar";

export interface ManageCollectiveProps {
  group?: any;
  loading: boolean;
}

const ManageCollective: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <Header title="Manage Collective" />

      <IonContent className="ion-padding" color="light">
        <MintTopBar />
        <p>Manage Collective/group settings page here</p>
      </IonContent>
    </IonPage>
  );
};

export default ManageCollective;
