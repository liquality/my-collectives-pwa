import Header from "@/components/Header";
import PoolLeaderboard from "@/components/Challenges/PoolLeaderboard";

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonSkeletonText,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";

const Challenge: React.FC = () => {
  const { routeInfo } = useIonRouter();
  console.log(routeInfo, "routeInfo");
  const query = new URLSearchParams(routeInfo.search);
  const [loadingImage, setLoadingImage] = useState(true);
  const contractAddress = query.get("contractAddress");
  const tokenId = routeInfo.id;
  const imageUrl =
    query.get("imageUrl") ??
    "https://ionicframework.com/docs/img/demos/avatar.svg";

  return (
    <IonPage>
      <Header title={`Challenge #${tokenId}`} />
      <IonContent className="ion-padding" color="light">
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-align-items-start">
            <IonCol size="12" sizeLg="6">
              <IonCard>
                <img
                  className="pool-detail-img"
                  alt="NFT Image"
                  style={{ display: loadingImage ? "none" : "block" }}
                  src={imageUrl}
                  onLoad={() => setLoadingImage(false)}
                  onError={() => setLoadingImage(false)}
                />
                {loadingImage ? (
                  <IonSkeletonText
                    className="pool-detail-img-skeleton"
                    animated={true}
                  ></IonSkeletonText>
                ) : null}
                <IonCardHeader>
                  <IonCardTitle>
                    {loadingImage ? (
                      <IonSkeletonText animated={true}></IonSkeletonText>
                    ) : (
                      `Challenge # ${tokenId}`
                    )}
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {loadingImage ? (
                      <IonSkeletonText animated={true}></IonSkeletonText>
                    ) : (
                      contractAddress
                    )}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent></IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeLg="6">
              <PoolLeaderboard />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Challenge;
