import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import useGetPoolsMetadata from "@/hooks/Pools/useGetPoolsMetadata";
import { convertIpfsImageUrl, shortenAddress } from "@/utils";
import {
  IonContent,
  IonGrid,
  IonImg,
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
          tokenData.map((pool: any, index: number) => (
            <div className="grid-item">
              <IonImg
                onClick={() =>
                  handlePoolClick(
                    pool.tokenId,
                    pool.collectionAddress,
                    convertIpfsImageUrl(pool.imageUrl)
                  )
                }
                key={index}
                className="grid-image"
                alt="NFT Image"
                src={convertIpfsImageUrl(pool.imageUrl)}
              ></IonImg>

              <IonRow>
                <IonText className="smallText"> {pool.tokenId}</IonText>
                <IonText className="smallText">
                  {shortenAddress(pool.collectionAddress)}
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
