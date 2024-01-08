import { useSignInWallet } from "@/hooks/useSignInWallet";
import ApiService from "@/services/ApiService";
import { Group } from "@/types/general-types";
import { shortenAddress } from "@/utils";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
  IonCardSubtitle,
  IonAlert,
  IonBackButton,
  IonButton,
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
              <IonLabel id="present-alert">{member.admin.toString()}</IonLabel>
              <IonAlert
                header="Are you sure you want to make this member a admin?"
                trigger="present-alert"
                buttons={[
                  {
                    text: "Cancel",
                    role: "cancel",
                    handler: () => {
                      console.log("Alert canceled");
                    },
                  },
                  {
                    text: "Yes",
                    role: "confirm",
                    handler: async () => {
                      try {
                        await ApiService.toggleAdminStatus(group.id, member.id);
                      } catch (error) {
                        console.log(error, "wats err");
                      }
                    },
                  },
                ]}
              ></IonAlert>
            </IonCol>
          ) : null}
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default MembersTable;
