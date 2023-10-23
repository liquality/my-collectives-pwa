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
    <IonContent color="light">
      <IonList inset={true}>
        {tokenData ? (
          tokenData.map((mintData: any, index: number) => (
            <IonItem
              onClick={() =>
                handlePoolClick(
                  mintData.token_id,
                  mintData.token_address,
                  convertIpfsImageUrl(mintData.normalized_metadata.image)
                )
              }
              key={index}
            >
              <IonAvatar>
                <img
                  alt="NFT Image"
                  src={convertIpfsImageUrl(mintData.normalized_metadata.image)}
                />
              </IonAvatar>
              <IonTitle>
                {mintData.normalized_metadata.name
                  ? mintData.normalized_metadata.name
                  : mintData.name + " #" + mintData.token_id}
              </IonTitle>
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
