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

export interface ChallengeItemCardProps {
  id: string;
  tokenId: string;
  mintingContractAddress: string;
  imageUrl: string;
  onChallengeSelected: (id: string) => void
}

const ChallengeItemCard: React.FC<ChallengeItemCardProps> = ({
  id,
  tokenId,
  mintingContractAddress,
  imageUrl,
  onChallengeSelected
}: ChallengeItemCardProps) => {
  const ipfsImageUrl = convertIpfsImageUrl(imageUrl);
  const [loading, setLoading] = useState(true);
  const router = useIonRouter();
  const handleClick = () => {
    onChallengeSelected(id)
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
            `Challenge # ${tokenId}`
          )}
        </IonCardTitle>
        <IonCardSubtitle>
          {loading ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            shortenAddress(mintingContractAddress)
          )}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent></IonCardContent>
    </IonCard>
  );
};

export default ChallengeItemCard;
