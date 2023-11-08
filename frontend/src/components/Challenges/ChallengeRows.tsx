import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { IonGrid, IonRow, IonCol, IonProgressBar } from "@ionic/react";
import React from "react";
import ChallengeItemCard from "./ChallengeItemCard";
import { PageLoadingIndicator } from "../PageLoadingIndicator";

const ChallengeRows: React.FC = () => {
  const { challenges, loading } = useGetChallenges();

  return (
    <IonGrid>
      {loading || !challenges ? (
        <PageLoadingIndicator />
      ) : (
        <IonRow style={{ margin: "1rem" }}>
          {challenges.map((challenge: any, index: number) => (
            <IonCol key={index} size="12" sizeSm="6" sizeMd="4" sizeLg="3">
              <>{console.log(challenge)}</>
              <ChallengeItemCard {...challenge} />
            </IonCol>
          ))}
        </IonRow>
      )}
    </IonGrid>
  );
};

export default ChallengeRows;
