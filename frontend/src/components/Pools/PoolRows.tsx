import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import useGetPoolsMetadata from "@/hooks/Pools/useGetPoolsMetadata";
import { convertIpfsImageUrl, shortenAddress } from "@/utils";
import {
  IonAvatar,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
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
      <IonGrid className="ion-grid">
        {tokenData ? (
          tokenData.map((mintData: any, index: number) => (
            <div className="grid-item">
              <IonImg
                onClick={() =>
                  handlePoolClick(
                    mintData.token_id,
                    mintData.token_address,
                    convertIpfsImageUrl(mintData.normalized_metadata.image)
                  )
                }
                key={index}
                className="grid-image"
                alt="NFT Image"
                src={convertIpfsImageUrl(mintData.normalized_metadata.image)}
              ></IonImg>

              <IonRow>
                <IonText className="smallText"> MINT NAME </IonText>
                <IonText className="smallText">
                  {shortenAddress(mintData.token_address)}
                </IonText>
                {/*                 <IonText> {mintData.normalized_metadata.name}</IonText>
                 */}{" "}
              </IonRow>
            </div>
          ))
        ) : (
          <IonTitle>Loading...</IonTitle>
        )}
      </IonGrid>
    </IonContent>
  );
};

export default PoolRows;
