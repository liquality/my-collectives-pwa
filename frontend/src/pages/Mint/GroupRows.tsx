import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import { Group } from "@/types/chat";
import { shortenAddress } from "@/utils";
import {
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonText,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import React from "react";

export interface GroupsRowsProps {
  groups?: Group[] | null;
  loading: boolean;
}
const GroupRows = ({ groups, loading }: GroupsRowsProps) => {
  const router = useIonRouter();

  const handleGroupClick = (groupId: string) => {
    router.push(`messages/${groupId}`);
  };

  return (
    <IonList inset={true}>
      <IonListHeader>
        <IonLabel>My Groups</IonLabel>
      </IonListHeader>
      {groups ? (
        groups.map((group, index) => (
          <IonItem
            button
            onClick={() => handleGroupClick(group.id?.toString())}
            key={index}
            detail={true}
          >
            <IonAvatar aria-hidden="true" slot="start">
              <img
                alt=""
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>
            <IonLabel>
              <h3>
                {group.group_name}
                {group.id}
              </h3>
              <p>Members: {group.number_of_members}</p>
            </IonLabel>
            <IonNote color="medium" slot="end">
              {shortenAddress(group.public_address)}
            </IonNote>
          </IonItem>
        ))
      ) : null }
    </IonList>
  );
};

export default GroupRows;
