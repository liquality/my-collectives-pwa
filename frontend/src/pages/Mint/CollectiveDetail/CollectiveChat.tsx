import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";

const CollectiveChat: React.FC<RouteComponentProps> = (routerProps) => {
  return (
    <IonPage>
      <Header title="Collective Name" />
      <IonContent className="ion-padding" color="light">
        <CollectiveTopBar {...routerProps}>
          <PageSearchBar />
        </CollectiveTopBar>
        <p>Chaaaat component goes here</p>
      </IonContent>
    </IonPage>
  );
};

export default CollectiveChat;
