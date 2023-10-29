import { convertIpfsImageUrl, shortenAddress } from "@/utils";
import {
  IonImg,
  useIonRouter,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSkeletonText,
} from "@ionic/react";
import React, { useState } from "react";

export interface PoolItemCardProps {
  tokenId: string;
  contractAddress: string;
  collectionAddress: string;
  imageUrl: string;
}

const PoolItemCard: React.FC<PoolItemCardProps> = ({
  tokenId,
  contractAddress,
  collectionAddress,
  imageUrl,
}: PoolItemCardProps) => {
  const ipfsImageUrl = convertIpfsImageUrl(imageUrl);
  const [loading, setLoading] = useState(true);
  const router = useIonRouter();

  const handleClick = () => {
    if (!loading) {
      router.push(
        `/pools/${tokenId}?&contractAddress=${contractAddress}&imageUrl=${ipfsImageUrl}`
      );
    }
  };

  return (
    <IonCard className="pool-item-card" onClick={handleClick}>
      <img
        className="pool-item-img"
        alt="NFT Image"
        style={{ display: loading ? "none" : "block" }}
        src={ipfsImageUrl}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      {loading ? (
        <IonSkeletonText
          className="pool-item-img-skeleton"
          animated={true}
        ></IonSkeletonText>
      ) : null}
      <IonCardHeader>
        <IonCardTitle>
          {loading ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            `Pool # ${tokenId}`
          )}
        </IonCardTitle>
        <IonCardSubtitle>
          {loading ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            shortenAddress(collectionAddress)
          )}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent></IonCardContent>
    </IonCard>
  );
};

export default PoolItemCard;
