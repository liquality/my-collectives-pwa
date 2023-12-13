import { Challenge } from "@/types/challenges";
import {
  convertIpfsImageUrl,
  cutOffTooLongString,
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

export interface MintItemResultProps {
  challenge: Challenge;
  result?: any;
}

const MintItemResult: React.FC<MintItemResultProps> = ({
  challenge
}: MintItemResultProps) => {

  return (
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="8">
            Result
          </IonCol>
        </IonRow>
      </IonGrid>
  );
};

export default MintItemResult;
