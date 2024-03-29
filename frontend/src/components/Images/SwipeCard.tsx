import React, { useState } from "react";

import {
  convertIpfsImageUrl,
  convertDateToReadable,
  cutOffTooLongString,
  shortenAddress,
  handleDisplayAddress,
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
import { pathConstants } from "@/utils/routeNames";
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

  const handleClick = () => {
    if (!loading) {
      if (setSelectedChallenge) {
        setSelectedChallenge(challenge as Challenge); // type assertion here
      } else {
        router.push(`/challenges/${id}`);
      }
    }
  };

  return (
    <IonCard className="card-img-swiper" onClick={handleClick}>
      <div style={{ position: "relative" }}>
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

        <div
          className="challenge-time-chip"
          style={{ position: "absolute", bottom: 5, left: 5, padding: 5 }}
        >
          {convertDateToReadable(expiration) === "expired " ? null : (
            <IonIcon src="/assets/icons/challenge-tile.svg"></IonIcon>
          )}{" "}
          {convertDateToReadable(expiration)}{" "}
        </div>
      </div>

      <IonCardHeader>
        <IonCardTitle>
          {loading ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            handleDisplayAddress(creatorOfMint || "")
          )}
        </IonCardTitle>
        <IonCardSubtitle>{cutOffTooLongString(name, 17)}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow className="ion-justify-content-between ion-align-items-center">
            <IonCol size="auto">
              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
              <IonLabel>{totalMints ?? "0"}</IonLabel>
            </IonCol>
            <IonCol size="auto">
              <IonLabel>
                {" "}
                {convertDateToReadable(expiration) === "expired " ? null : (
                  <IonIcon src="/assets/icons/challenge-tile.svg"></IonIcon>
                )}{" "}
                {convertDateToReadable(expiration)}
              </IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default SwipeCard;
