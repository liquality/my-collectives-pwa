import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import MintTopBar from "@/components/Mint/MintTopBar";

const CollectiveInvites: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <Header title="Manage Collective" />

      <IonContent className="ion-padding" color="light">
        <MintTopBar />
        <p>Put all the users current collective invites here</p>
      </IonContent>
    </IonPage>
  );
};

export default CollectiveInvites;
