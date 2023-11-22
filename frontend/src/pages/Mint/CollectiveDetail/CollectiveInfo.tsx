import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import MintTopBar from "@/components/TopBars/MintTopBar";
import PageSearchBar from "@/components/PageSearchBar";

const CollectiveInfo: React.FC<RouteComponentProps> = (routerProps) => {
  return (
    <IonPage>
      <Header title="Manage Collective" />

      <IonContent className="ion-padding" color="light">
        <MintTopBar {...routerProps}>
          <PageSearchBar />
        </MintTopBar>
        <p>Put all the INFOO HERE</p>
      </IonContent>
    </IonPage>
  );
};

export default CollectiveInfo;
