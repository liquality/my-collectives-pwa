import { IonContent, IonPage } from "@ionic/react";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import MintTopBar from "@/components/TopBars/MintTopBar";
import PageSearchBar from "@/components/PageSearchBar";

export interface ManageCollectiveProps {
  group?: any;
  loading: boolean;
}

const ManageCollective: React.FC<RouteComponentProps> = (routerProps) => {
  return (
    <IonPage>
      <Header title="Manage Collective" />

      <IonContent className="ion-padding" color="light">
        <MintTopBar {...routerProps}>
          <PageSearchBar />
        </MintTopBar>
        <p>Manage Collective/group settings page here</p>
      </IonContent>
    </IonPage>
  );
};

export default ManageCollective;
