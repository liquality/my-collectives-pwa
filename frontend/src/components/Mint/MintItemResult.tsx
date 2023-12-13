import { Challenge } from "@/types/challenges";
import { MintResult } from "@/types/mint";
import { convertIpfsImageUrl, cutOffTooLongString } from "@/utils";
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
  IonContent,
  IonButton,
  IonInput,
} from "@ionic/react";
import { add, remove } from "ionicons/icons";
import React, { useState } from "react";

export interface MintItemResultProps {
  challenge: Challenge;
  result?: MintResult;
  collective?: any;
}

const MintItemResult: React.FC<MintItemResultProps> = ({
  challenge,
  result,
  collective,
}: MintItemResultProps) => {
  const [loadingImage, setLoadingImage] = useState(true);
  return (
    <>
      {result?.success ? (
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center">
              <h2>Congrats! you Minted</h2>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
              <IonCard className="challenge-mint-card">
                <img
                  className="challenge-mint-img"
                  alt="NFT Image"
                  style={{ display: loadingImage ? "none" : "block" }}
                  src={convertIpfsImageUrl(challenge.imageUrl)}
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
                  28 mins left
                </div>
                <IonCardHeader>
                  <IonCardTitle>
                    {loadingImage ? (
                      <IonSkeletonText animated={true}></IonSkeletonText>
                    ) : (
                      `Creator.eth`
                    )}
                  </IonCardTitle>
                  <IonCardSubtitle>
                    <div className="name">
                      {cutOffTooLongString(challenge.name, 20)}
                    </div>
                    <div className="cost">{challenge.floorPrice} ETH</div>
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol className="ion-text-center">
              <h4>Invite others to do the same</h4>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-bottom">
            <IonCol size="auto">
              <IonButton color="primary" shape="round">
                Invite to Group
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol className="ion-text-center">
              <h5>Promote on socials, anyone can mint</h5>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
              <IonButton fill="clear">
                <IonIcon
                  slot="icon-only"
                  src="/assets/icons/social_twitter.svg"
                />
              </IonButton>
              <IonButton fill="clear">
                <IonIcon
                  slot="icon-only"
                  src="/assets/icons/social_discord.svg"
                />
              </IonButton>
              <IonButton fill="clear">
                <IonIcon
                  slot="icon-only"
                  src="/assets/icons/social_telegram.svg"
                />
              </IonButton>
              <IonButton fill="clear">
                <IonIcon
                  slot="icon-only"
                  src="/assets/icons/social_sound.svg"
                />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      ) : (
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="8">Result</IonCol>
          </IonRow>
        </IonGrid>
      )}
    </>
  );
};

export default MintItemResult;
