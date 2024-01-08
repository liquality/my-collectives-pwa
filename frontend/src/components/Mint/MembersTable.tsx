import { useSignInWallet } from "@/hooks/useSignInWallet";
import { Group } from "@/types/general-types";
import { shortenAddress } from "@/utils";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
  IonCardSubtitle,
} from "@ionic/react";
import React, { useState } from "react";

export interface MembersTableProps {
  members: any[] | null;
  group: Group;
}

const MembersTable: React.FC<MembersTableProps> = ({
  members,
  group,
}: MembersTableProps) => {
  console.log(group, "wats group?");
  const { user } = useSignInWallet();

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
        {user?.id === group.createdBy ? (
          <IonCol size="auto">
            <IonCardSubtitle>Admin</IonCardSubtitle>
          </IonCol>
        ) : null}
      </IonRow>
      {members?.map((member, index) => (
        <IonRow className="ion-justify-content-between " key={index}>
          <IonCol size="auto">
            <IonLabel>{shortenAddress(member.publicAddress)}</IonLabel>
          </IonCol>
          <IonCol size="auto">
            <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
            <IonLabel>8</IonLabel>
          </IonCol>

          <IonCol size="auto">
            <IonLabel>0.0017 ETH</IonLabel>
          </IonCol>
          {user?.id === group.createdBy ? (
            <IonCol size="auto">
              <IonLabel>{member.admin.toString()}</IonLabel>
            </IonCol>
          ) : null}
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default MembersTable;
