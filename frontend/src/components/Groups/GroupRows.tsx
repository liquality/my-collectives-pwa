import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import useGetNumberOfMembersInGroup from "@/hooks/Groups/useGetNumberOfMembersInGroup";
import { shortenAddress } from "@/utils";
import { IonContent, IonItem, IonLabel, IonList, IonTitle } from "@ionic/react";

import React from "react";

const GroupRows: React.FC = () => {
  const { myGroups } = useGetMyGroups();

  console.log(myGroups, "mygroups??");

  return (
    <IonContent color="light">
      <IonList inset={true}>
        {myGroups?.map((group, index) => (
          <IonItem key={index}>
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
