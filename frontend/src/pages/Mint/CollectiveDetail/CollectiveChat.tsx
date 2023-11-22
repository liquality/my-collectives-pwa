import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import MintTopBar from "@/components/TopBars/MintTopBar";
import PageSearchBar from "@/components/PageSearchBar";

const CollectiveChat: React.FC<RouteComponentProps> = (routerProps) => {
  return (
    <IonPage>
      <Header title="Chat" />

      <IonContent className="ion-padding" color="light">
        <MintTopBar {...routerProps}>
          <PageSearchBar />
        </MintTopBar>
        <p>CHaat component goes here</p>
      </IonContent>
    </IonPage>
  );
};

export default CollectiveChat;
