import useGetChallenges from "@/hooks/Pools/useGetChallenges";
import { IonGrid, IonRow, IonCol, IonProgressBar } from "@ionic/react";
import React from "react";
import PoolItemCard from "./PoolItemCard";
import { PageLoadingIndicator } from "../PageLoadingIndicator";

const PoolRows: React.FC = () => {
  const { tokenData, loading } = useGetChallenges();

  return (
    <IonGrid>
      {loading || !tokenData ? (
        <PageLoadingIndicator />
      ) : (
        <IonRow style={{ margin: "1rem" }}>
          {tokenData.map((pool: any, index: number) => (
            <IonCol key={index} size="12" sizeSm="6" sizeMd="4" sizeLg="3">
              <PoolItemCard {...pool} />
            </IonCol>
          ))}
        </IonRow>
      )}
    </IonGrid>
  );
};

export default PoolRows;
