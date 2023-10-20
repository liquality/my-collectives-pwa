import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import useGetPoolsMetadata from "@/hooks/Pools/useGetPoolsMetadata";
import { convertIpfsImageUrl, shortenAddress } from "@/utils";
import {
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  useIonRouter,
} from "@ionic/react";

import React from "react";

const PoolRows: React.FC = () => {
  const { tokenData, loading } = useGetPoolsMetadata();
  const router = useIonRouter();

  const handlePoolClick = (mintContract: string) => {
    router.push(`pools/${mintContract}`);
  };

  console.log(tokenData, "Tokendata");

  return (
    <IonContent color="light">
      <IonList inset={true}>
        {tokenData ? (
          tokenData.map((mintData: any, index: number) => (
            <IonItem
              onClick={() => handlePoolClick(mintData.id?.toString())}
              key={index}
            >
              <IonAvatar>
                <img
                  alt="Silhouette of a person's head"
                  src={convertIpfsImageUrl(mintData.normalized_metadata.image)}
                />
              </IonAvatar>
              <IonTitle>{mintData.normalized_metadata.name}</IonTitle>
              <IonItem> {shortenAddress(mintData.token_address)}</IonItem>
            </IonItem>
          ))
        ) : (
          <IonTitle>Loading...</IonTitle>
        )}
      </IonList>
    </IonContent>
  );
};

export default PoolRows;
