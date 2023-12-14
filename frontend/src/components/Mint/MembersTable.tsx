import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
  IonCardSubtitle,
} from "@ionic/react";
import React, { useState } from "react";

export interface MembersTableProps {}

const MembersTable: React.FC<MembersTableProps> = (
  props: MembersTableProps
) => {
  const staticDummyArray = [1, 2, 3, 4];
  return (
    <IonGrid className="members-table">
      <IonRow className="ion-justify-content-between ">
        <IonCol size="auto">
          <IonCardSubtitle>Member</IonCardSubtitle>
        </IonCol>
        <IonCol size="auto">
          <IonCardSubtitle>Minted</IonCardSubtitle>
        </IonCol>

        <IonCol size="auto">
          <IonCardSubtitle>TOTAL</IonCardSubtitle>
        </IonCol>
      </IonRow>
      {staticDummyArray.map((item, index) => (
        <IonRow className="ion-justify-content-between " key={index}>
          <IonCol size="auto">
            <IonLabel>0x1234...5678</IonLabel>
          </IonCol>
          <IonCol size="auto">
            <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
            <IonLabel>8</IonLabel>
          </IonCol>

          <IonCol size="auto">
            <IonLabel>0.0017 ETH</IonLabel>
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default MembersTable;
