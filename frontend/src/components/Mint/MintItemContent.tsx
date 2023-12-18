import { Challenge } from "@/types/challenges";
import { MintResult } from "@/types/mint";
import {
  convertDateToReadable,
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
  IonButton,
  IonInput,
} from "@ionic/react";
import { add, remove } from "ionicons/icons";
import React, { Dispatch, SetStateAction, useState } from "react";

export interface MintItemContentProps {
  challenge: Challenge;
  setResult: Dispatch<SetStateAction<MintResult | null>>;
}

const MintItemContent: React.FC<MintItemContentProps> = ({
  challenge: { imageUrl, name, floorPrice, groupCount, expiration },
  setResult,
}: MintItemContentProps) => {
  const ipfsImageUrl = convertIpfsImageUrl(imageUrl);
  const [loadingImage, setLoadingImage] = useState(true);
  const [amount, setAmount] = useState(1);
  const router = useIonRouter();

  const handleDetailsClick = () => {};
  const handleChangeCollectiveClick = () => {};
  const handleMintClick = () => {};

  const handlePlusClick = () => {
    setAmount(amount + 1);
  };

  const handleMinusClick = () => {
    if (amount > 2) {
      setAmount(amount - 1);
    } else {
      setAmount(1);
    }
  };

  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center">
        <IonCol size="8" style={{ display: "flex", justifyContent: "center" }}>
          <IonCard className="challenge-mint-card">
            <img
              className="challenge-mint-img"
              alt="NFT Image"
              style={{ display: loadingImage ? "none" : "block" }}
              src={ipfsImageUrl}
              onLoad={() => setLoadingImage(false)}
              onError={() => setLoadingImage(false)}
            />
            {loadingImage ? (
              <IonSkeletonText
                className="challenge-mint-img-skeleton"
                animated={true}
              ></IonSkeletonText>
            ) : null}
            <div className="challenge-time-chip challenge-time-chip-ontop">
            {convertDateToReadable(expiration)}
            </div>
            <IonCardHeader>
              <IonCardTitle>
                {loadingImage ? (
                  <IonSkeletonText animated={true}></IonSkeletonText>
                ) : (
                  `Creator.eth`
                )}
              </IonCardTitle>
              <IonCardSubtitle >
                {<div className="name">{cutOffTooLongString(name, 30)}</div>}
                
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid className="">
                <IonRow className="ion-justify-content-left ion-align-items-center">
                  <IonCol size="auto">
                    <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
                    <IonLabel>80</IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center ion-align-items-center">
        <IonCol size="8" className="challenge-mint-amount-container">
          <IonButton
            className="challenge-mint-amount-btn"
            fill="outline"
            shape="round"
            size="small"
            onClick={handlePlusClick}
          >
            <IonIcon slot="icon-only" icon={add}></IonIcon>
          </IonButton>

          <IonInput
            className="challenge-mint-amount"
            type="number"
            value={amount}
          ></IonInput>
          <IonButton
            className="challenge-mint-amount-btn"
            fill="outline"
            shape="round"
            size="small"
            onClick={handleMinusClick}
            disabled={amount <= 1}
          >
            <IonIcon slot="icon-only" icon={remove}></IonIcon>
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol size="6">NFT & Fee: {floorPrice}</IonCol>
        <IonCol size="2">
          <IonButton fill="clear" size="small" onClick={handleDetailsClick}>
            Details
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol size="6">Collective Name</IonCol>

        <IonCol size="2">
          <IonButton
            fill="clear"
            size="small"
            onClick={handleChangeCollectiveClick}
          >
            Change
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="mint-content-bottom-ribbon ion-justify-content-center ion-align-items-center">
        <IonCol size="12">
          <IonButton fill="clear" size="small" className="ion-no-padding">
            Mint in a Group
          </IonButton>
          <IonLabel> for a chance to get rewared</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto">
          <IonButton
            onClick={() => setResult({ success: true })}
            color="primary"
            shape="round"
          >
            Mint {floorPrice} ETH
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default MintItemContent;
