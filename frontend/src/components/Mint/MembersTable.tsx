import { useSignInWallet } from "@/hooks/useSignInWallet";
import useToast from "@/hooks/useToast";
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
import { banOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";

export interface MembersTableProps {
  members: any[];
  group: Group;
}

const MembersTable: React.FC<MembersTableProps> = ({
  members,
  group,
}: MembersTableProps) => {
  const { presentToast } = useToast();
  const [localMembers, setLocalMembers] = useState<any[]>(members);

  const handleToggleAdminStatus = async (memberId: string) => {
    try {
      const result = await ApiService.toggleAdminStatus(group.id, memberId);
      if (!result.success) {
        presentToast(
          "Could not change admin role. Be aware that you can't change the creators admin role.",
          "danger",
          banOutline
        );
      } else {
        // Update local state with modified admin status
        setLocalMembers((prevMembers) =>
          prevMembers.map((prevMember) =>
            prevMember.id === memberId
              ? { ...prevMember, admin: !prevMember.admin }
              : prevMember
          )
        );
      }
    } catch (error) {
      presentToast("Could not change admin role...", "danger", banOutline);
      console.error("Error toggling admin status:", error);
    }
  };

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
        {group.loggedInUserIsAdmin ? (
          <IonCol size="auto">
            <IonCardSubtitle>Admin</IonCardSubtitle>
          </IonCol>
        ) : null}
      </IonRow>
      {localMembers?.map((member) => (
        <IonRow className="ion-justify-content-between" key={member.id}>
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
          {group.loggedInUserIsAdmin ? (
            <IonCol size="auto">
              <IonLabel id={`present-alert-${member.id}`}>
                {member.admin.toString()}
              </IonLabel>
              {/* TODO: add this alert to its own component */}
              <IonAlert
                header={
                  member.admin
                    ? "Are you sure you want to make this member a admin?"
                    : "Are you sure you want to remove this member as a admin?"
                }
                trigger={`present-alert-${member.id}`}
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
                    handler: () => handleToggleAdminStatus(member.id),
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
