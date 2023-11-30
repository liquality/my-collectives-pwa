import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { IonGrid, IonRow, IonCol, IonProgressBar } from "@ionic/react";
import React from "react";
import { PageLoadingIndicator } from "../PageLoadingIndicator";
import PoolItemCard from "./PoolItemCard";
import { Pool } from "@/types/challenges";

//TODO: add pool type
interface PoolsGridProps {
  pools: Pool[];
  loading: boolean;
}

const PoolsGrid: React.FC<PoolsGridProps> = (props) => {
  const { pools, loading } = props;
  console.log(pools, "Pools in props?");
  return (
    <IonGrid>
      {loading || !pools ? (
        <PageLoadingIndicator />
      ) : (
        <IonRow style={{ margin: "1rem" }}>
          {pools.map((pool: any, index: number) => (
            <PoolItemCard key={index} {...pool} />
          ))}
        </IonRow>
      )}
    </IonGrid>
  );
};

export default PoolsGrid;
