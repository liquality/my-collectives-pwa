import useGetPoolsMetadata from "@/hooks/Pools/useGetPoolsMetadata";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
} from "@ionic/react";
import React from "react";
import PoolItemCard from "./PoolItemCard";

const PoolRows: React.FC = () => {
  const { tokenData, loading } = useGetPoolsMetadata();

  return (
    <IonGrid>
      {loading || !tokenData ? (
        <IonRow
          className="ion-justify-content-center ion-align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <IonCol>
            <IonProgressBar type="indeterminate"></IonProgressBar>
          </IonCol>
        </IonRow>
      ) : (
        <IonRow style={{ margin: "1rem" }}>
          {tokenData.map((pool: any, index: number) => (
            <IonCol key={index} size="12" sizeSm="6" sizeMd="4" sizeLg="3">
              <PoolItemCard {...pool}/>
            </IonCol>
          ))}
        </IonRow>
      )}
    </IonGrid>
  );
};

export default PoolRows;
