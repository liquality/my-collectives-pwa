import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import useGetNumberOfMembersInGroup from "@/hooks/Groups/useGetNumberOfMembersInGroup";
import { shortenAddress } from "@/utils";
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  useIonRouter,
} from "@ionic/react";

import React from "react";

const GroupRows: React.FC = () => {
  const { myGroups } = useGetMyGroups();
  const router = useIonRouter();

  console.log(myGroups, "mygroups??");
  const handleGroupClick = (groupId: string) => {
    router.push(`messages/${groupId}`);
  };

  return (
    <IonContent color="light">
      <IonList inset={true}>
        {myGroups?.map((group, index) => (
          <IonItem
            onClick={() => handleGroupClick(group.id?.toString())}
            key={index}
          >
            <IonTitle>{group.group_name}</IonTitle>
            <IonLabel>Members: {group.number_of_members} </IonLabel>
            <IonItem> {shortenAddress(group.public_address)}</IonItem>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default GroupRows;
