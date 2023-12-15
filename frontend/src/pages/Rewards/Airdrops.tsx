import { IonContent, IonPage } from "@ionic/react";

import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { RouteComponentProps } from "react-router";
import PageSearchBar from "@/components/PageSearchBar";
import RewardsTopBar from "@/components/TopBars/RewardsTopBar";
import Header from "@/components/Header";
import MintZoraLogic from "@/components/MintZoraLogic";

const Airdrops: React.FC<RouteComponentProps> = (routerProps) => {
  const { challenges, loading } = useGetChallenges();
  //TODO: change parent tag to IonPage
  return (
    <IonPage>
      <Header title="Rewards" />

      <MintZoraLogic
        chainId={7777777}
        tokenId={"1"}
        tokenContract={"0x5aa959de99e0e49b8a85e0a630a74a7b757772b7"}
        /* chainId={"8453"}
           tokenId={""}
        tokenContract={"0xbd87f4da73ff92a7bea31e2de20e14f9829f42fe"} */
      />
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
