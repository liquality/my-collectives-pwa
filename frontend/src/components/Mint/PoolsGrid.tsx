import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { IonGrid, IonRow, IonCol, IonProgressBar } from "@ionic/react";
import React from "react";
import { PageLoadingIndicator } from "../PageLoadingIndicator";
import PoolItemCard from "./PoolItemCard";

//TODO: add pool type
const PoolsGrid: React.FC = ({ pools, loading }: any) => {
  console.log(pools, "Pools in props?");
  return (
    <IonGrid>
      {loading || !pools ? (
        <PageLoadingIndicator />
      ) : (
        <IonRow style={{ margin: "1rem" }}>
          {pools.map((pool: any, index: number) => (
            <PoolItemCard {...pool} />
          ))}
        </IonRow>
      )}
    </IonGrid>
  );
};

export default PoolsGrid;
