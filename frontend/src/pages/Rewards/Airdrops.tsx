import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";

import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { RouteComponentProps } from "react-router";
import PageSearchBar from "@/components/PageSearchBar";
import RewardsTopBar from "@/components/TopBars/RewardsTopBar";
import Header from "@/components/Header";
import MintZoraLogic from "@/components/MintZoraLogic";

const Airdrops: React.FC<RouteComponentProps> = (routerProps) => {
  const { challenges, loading } = useGetChallenges();
  return (
    <IonPage>
      <Header title="Rewards" />
      <IonContent className="ion-padding" color="light">
        <RewardsTopBar {...routerProps}>
          <PageSearchBar searchEnabled={false} reloadEnabled={false} />
        </RewardsTopBar>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-left">Coming Soon...</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Airdrops;
