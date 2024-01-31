import { Challenge } from "@/types/challenges";
import { MintResult } from "@/types/mint";
import {
  convertIpfsImageUrl,
  cutOffTooLongString,
  handleDisplayAddress,
} from "@/utils";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSkeletonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  isPlatform,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import GenerateInviteBtn from "../GenerateInvite";
import SocialShareButton from "../SocialShareButton";

const shareText = `I just minted in MyCollective.tech`;

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
  const [canUseShare, setCanUseShare] = useState(false);
  const [shareData, setShareData] = useState<ShareData | undefined>(undefined);

  console.log(result, "result group!!!");

  const handleShare = () => {
    navigator.share(shareData);
  };
  useEffect(() => {
    if (challenge) {
      const data = {
        url:   `${import.meta.env.VITE_CLIENT_PRODUCTION_URL}mint/nft/${challenge.id}`,
        text: shareText,
      };
      if (navigator.canShare && navigator.canShare(data)) {
        setCanUseShare(true);
        setShareData(data);
      } else {
        setCanUseShare(false);
      }
    }
  }, [challenge]);

  return (
    <>
      {result?.success && result?.group ? (
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
                <IonCardHeader>
                  <IonCardTitle>
                    {loadingImage ? (
                      <IonSkeletonText animated={true}></IonSkeletonText>
                    ) : (
                      handleDisplayAddress(challenge.creatorOfMint ?? "")
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
              <GenerateInviteBtn type="mint" groupId={result.group.id} />
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-bottom ">
            <IonCol size="auto">
              {/*        <IonButton onClick={joinCollective} color="primary" shape="round">
                Invite to Group
              </IonButton>  */}
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol className="ion-text-center">
              <h5>Promote on socials, anyone can mint</h5>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
              {!isPlatform("desktop") && canUseShare ? (
                <IonButton shape="round" onClick={handleShare}>
                  Share
                </IonButton>
              ) : (
                <>
                  <SocialShareButton
                    socialNetwork="x"
                    text={shareText}
                    url={shareData?.url}
                  />
                  {/* <SocialShareButton socialNetwork="discord" challengeId={challenge.id}/> */}
                  <SocialShareButton
                    socialNetwork="telegram"
                    text={shareText}
                    url={shareData?.url}
                  />
                  {/* <SocialShareButton socialNetwork="sound" challengeId={challenge.id}/> */}
                </>
              )}
              <></>
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
