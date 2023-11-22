import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import MintTopBar from "@/components/TopBars/MintTopBar";
import PageSearchBar from "@/components/PageSearchBar";

const CollectiveChat: React.FC<RouteComponentProps> = (routerProps) => {
  console.log("IN HERE?");
  return (
    <IonPage>
      <Header title="Collective Name" />

      <IonContent className="ion-padding" color="light">
        <MintTopBar {...routerProps}>
          <PageSearchBar />
        </MintTopBar>
        <p>Mints/pools for specific group goes here</p>
      </IonContent>
    </IonPage>
  );
};

export default CollectiveChat;
