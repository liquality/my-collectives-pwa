import { IonPage, IonFab, IonContent } from "@ionic/react";
import { shortenAddress } from "@/utils";
import { RouteComponentProps } from "react-router";
import Header from "@/components/Header";
import MintTopBar from "@/components/TopBars/MintTopBar";

import PageSearchBar from "@/components/PageSearchBar";

const MyMints: React.FC<RouteComponentProps> = (routerProps) => {
  return (
    <IonPage>
      <Header title="Mint" />

      <IonContent className="ion-padding">
        <MintTopBar {...routerProps}>
          <PageSearchBar />
        </MintTopBar>
        MY MINTS page
        <IonFab slot="fixed" vertical="bottom" horizontal="end"></IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MyMints;
