import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import useGetPoolsMetadata from "@/hooks/Pools/useGetPoolsMetadata";
import { convertIpfsImageUrl, shortenAddress } from "@/utils";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonText,
  IonTitle,
  useIonRouter,
} from "@ionic/react";

import React from "react";

const PoolLeaderboard: React.FC = () => {
  const { tokenData, loading } = useGetPoolsMetadata();
  const router = useIonRouter();

  const handlePoolClick = (
    token_id: string,
    contract_address: string,
    imageUrl: string
  ) => {
    router.push(
      `/pool/?tokenId=${token_id}&contractAddress=${contract_address}&imageUrl=${imageUrl}`
    );
  };

  return (
    <IonGrid class="IonText-center">
      <IonRow class="ion-margin">
        <IonCol>
          <IonTitle>
            <IonText color="default">LEADERBOARD</IonText>
          </IonTitle>
        </IonCol>
      </IonRow>

      <IonRow class="header-row">
        <IonCol>
          <IonText>
            <b>Owner</b>
          </IonText>
        </IonCol>

        <IonCol>
          <IonText>
            <b>Number of Mints</b>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonText>bedbuug.eth</IonText>
        </IonCol>

        <IonCol>
          <IonText>5</IonText>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonText>tommy.eth</IonText>
        </IonCol>

        <IonCol>
          <IonText>10</IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PoolLeaderboard;
