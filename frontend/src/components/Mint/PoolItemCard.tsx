import { Challenge } from "@/types/challenges";
import {
  convertIpfsImageUrl,
  cutOffTooLongString,
  shortenAddress,
} from "@/utils";
import {
  useIonRouter,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSkeletonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";

export interface PoolItemCardProps extends Challenge {
  tokenId: string;
  mintingContractAddress: string;
  imageUrl: string;
}

const PoolItemCard: React.FC<PoolItemCardProps> = ({
  tokenId,
  mintingContractAddress,
  imageUrl,
  name,
  chainId,
  category,
  totalMints,
  platform,
  expiration,
  expired,
}: PoolItemCardProps) => {
  const ipfsImageUrl = convertIpfsImageUrl(imageUrl);
  const [loading, setLoading] = useState(true);
  const router = useIonRouter();
  const handleClick = () => {
    if (!loading) {
      router.push(
        `/challenge/${tokenId}?&contractAddress=${mintingContractAddress}&imageUrl=${ipfsImageUrl}`
      );
    }
  };

  return (
    <IonCard
      style={{ width: "47%", marginRight: "3%" }}
      className="card-img-swiper "
      onClick={handleClick}
    >
      {" "}
      <img
        className="swiper-item-img"
        alt="NFT Image"
        style={{ display: loading ? "none" : "block" }}
        src={ipfsImageUrl}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      {loading ? (
        <IonSkeletonText
          className="swiper-item-img-skeleton"
          animated={true}
        ></IonSkeletonText>
      ) : null}
      <IonCardHeader>
        <IonCardTitle>
          {loading ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            `Creator.eth`
          )}
        </IonCardTitle>
        <IonCardSubtitle>{cutOffTooLongString(name, 20)}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow className="ion-justify-content-between ion-align-items-center">
            <IonCol size="auto">
              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
              <IonLabel>80</IonLabel>
            </IonCol>
            <IonCol size="auto">
              <IonIcon src="/assets/icons/people-tile.svg"></IonIcon>
              <IonLabel>80</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default PoolItemCard;
