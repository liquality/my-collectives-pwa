import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import {
  convertIpfsImageUrl,
  cutOffTooLongString,
  shortenAddress,
} from "@/utils";
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
import { Challenge } from "@/types/challenges";
import { routes } from "@/utils/routeNames";
import { useLocation } from "react-router";

export interface SwipeCardProps {
  challenge: Challenge;
  setSelectedChallenge?: (challenge: Challenge) => void;
  selectedChallenge?: Challenge;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  challenge,
  setSelectedChallenge,
  selectedChallenge,
}: SwipeCardProps) => {
  const {
    id,
    mintingContractAddress,
    chainId,
    tokenId,
    category,
    name,
    expiration,
    expired,
    totalMints,
    imageUrl,
    creatorOfMint,
  } = challenge;
  const ipfsImageUrl = convertIpfsImageUrl(imageUrl);
  const [loading, setLoading] = useState(true);
  const router = useIonRouter();
  const location = useLocation();

  const handleClick = () => {
    if (!loading) {
      if (
        routes.mintPage.createCollective === location.pathname &&
        typeof setSelectedChallenge === "function"
      ) {
        setSelectedChallenge(challenge as Challenge); // type assertion here
      } else {
        router.push(
          `/challenge/${tokenId}?&contractAddress=${mintingContractAddress}&imageUrl=${ipfsImageUrl}`
        );
      }
    }
  };

  console.log(
    selectedChallenge?.mintingContractAddress ===
      challenge?.mintingContractAddress,
    "SELECTED?????",
    selectedChallenge
  );
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

            {selectedChallenge?.mintingContractAddress ===
            challenge?.mintingContractAddress ? (
              <IonCol size="auto">
                <IonLabel>SELECTED</IonLabel>
              </IonCol>
            ) : null}
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default SwipeCard;
