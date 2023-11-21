import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import MintTopBar from "@/components/Mint/MintTopBar";
import PageSearchBar from "@/components/PageSearchBar";

const CollectiveInvites: React.FC<RouteComponentProps> = (routerProps) => {
  return (
    <IonPage>
      <Header title="Invites" />

      <IonContent className="ion-padding" color="light">
        <MintTopBar {...routerProps}>
          <PageSearchBar />
        </MintTopBar>
        <p>Put all the users current collective invites here</p>
      </IonContent>
    </IonPage>
  );
};

export default CollectiveInvites;
