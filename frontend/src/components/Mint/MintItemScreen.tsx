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
  IonContent,
  IonButton,
  IonInput,
} from "@ionic/react";
import { add, remove } from "ionicons/icons";
import React, { useState } from "react";
import MintItemContent from "./MintItemContent";
import MintItemResult from "./MintItemResult";

export interface MintItemScreenProps {
  challenge: Challenge;
}

const MintItemScreen: React.FC<MintItemScreenProps> = ({
  challenge,
}: MintItemScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const router = useIonRouter();

  return (
    <IonContent>
      {result ? (
        <MintItemResult challenge={challenge} result={result} />
      ) : (
        <MintItemContent challenge={challenge} setResult={setResult}/>
      )}
    </IonContent>
  );
};

export default MintItemScreen;
