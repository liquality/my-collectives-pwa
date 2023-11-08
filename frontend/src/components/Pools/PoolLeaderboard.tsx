import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import useGetLeaderboard from "@/hooks/Pools/useGetLeaderboard";
import useGetChallenges from "@/hooks/Pools/useGetChallenges";
import { convertIpfsImageUrl, shortenAddress } from "@/utils";
import {
  IonAvatar,
  IonBadge,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  useIonRouter,
} from "@ionic/react";

import React from "react";

const PoolLeaderboard: React.FC = () => {
  const { tokenData, loading } = useGetChallenges();
  const router = useIonRouter();
  const {
    leaderboard,
    loading: loadingLeaderboard,
    error: errorLoadingLeaderboard,
  } = useGetLeaderboard();
  console.log(leaderboard, "wats leaderboard?", loadingLeaderboard);

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonText className="ion-text-center">
            <h3>LEADERBOARD</h3>
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          {loadingLeaderboard && !errorLoadingLeaderboard ? (
            <IonProgressBar type="indeterminate"></IonProgressBar>
          ) : (
            <IonList className="ion-padding">
              <IonListHeader style={{ paddingLeft: 0 }}>
                <IonLabel className="ion-text-left">Owner</IonLabel>
                <IonLabel className="ion-text-right ion-pr-2">Mints</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonAvatar aria-hidden="true" slot="start">
                  <img
                    alt=""
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </IonAvatar>
                <IonLabel>bedbuug.eth</IonLabel>
                <IonBadge slot="end">5</IonBadge>
              </IonItem>
              <IonItem>
                <IonAvatar aria-hidden="true" slot="start">
                  <img
                    alt=""
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </IonAvatar>
                <IonLabel>tommy.eth</IonLabel>
                <IonBadge slot="end">10</IonBadge>
              </IonItem>
            </IonList>
          )}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PoolLeaderboard;
