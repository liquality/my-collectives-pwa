import { IonContent, IonPage } from "@ionic/react";

import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { RouteComponentProps } from "react-router";
import PageSearchBar from "@/components/PageSearchBar";
import RewardsTopBar from "@/components/TopBars/RewardsTopBar";

const Airdrops: React.FC<RouteComponentProps> = (routerProps) => {
  const { challenges, loading } = useGetChallenges();
  //TODO: change parent tag to IonPage
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <RewardsTopBar {...routerProps}>
          <PageSearchBar searchEnabled={false} reloadEnabled={false} />
        </RewardsTopBar>
        <div className="flexDirectionCol mb-1">
          <h4>AIRDROPPPS</h4>
          <ul className="bullet-points">
            <li>Lorem ipsum dolor gauorn ketrada.</li>
            <li>adipiscing elit haieorty greqa.</li>
            <li>Donec tincidunt odio.</li>
          </ul>
        </div>
        <div className="pink-line mb-1"></div>
      </IonContent>
    </IonPage>
  );
};

export default Airdrops;
