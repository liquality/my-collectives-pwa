import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { convertIpfsImageUrl, shortenAddress } from "@/utils";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonSkeletonText,
  useIonRouter,
} from "@ionic/react";

export interface SwipeCardProps {
  tokenId: string;
  mintingContractAddress: string;
  imageUrl: string;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  tokenId,
  mintingContractAddress,
  imageUrl,
}: SwipeCardProps) => {
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
    <IonCard className="card-img-swiper" onClick={handleClick}>
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
        <IonCardSubtitle>
          {loading ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            `Title Get Elipess...`
          )}
        </IonCardSubtitle>
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
            <IonCol size="auto">
              <IonIcon src="/assets/icons/message-tile.svg"></IonIcon>
              <IonLabel>80</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default SwipeCard;
