import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";

const CollectiveInfo: React.FC<RouteComponentProps> = (routerProps) => {
  return (
    <IonPage>
      <Header title="Collective Name" />
      <IonContent className="ion-padding" color="light">
        <CollectiveTopBar {...routerProps}>
          <PageSearchBar />
        </CollectiveTopBar>
        <p>Info about a specific group</p>
      </IonContent>
    </IonPage>
  );
};

export default CollectiveInfo;
