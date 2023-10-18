import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import { shortenAddress } from "@/utils";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  useIonRouter,
} from "@ionic/react";

import React from "react";

const GroupRows: React.FC = () => {
  const { myGroups, loading } = useGetMyGroups();
  const router = useIonRouter();

  const handleGroupClick = (groupId: string) => {
    router.push(`messages/${groupId}`);
  };

  return (
    <IonContent color="light">
      <IonList inset={true}>
        {myGroups ? (
          myGroups.map((group, index) => (
            <IonItem
              onClick={() => handleGroupClick(group.id?.toString())}
              key={index}
            >
              <IonTitle>
                {group.group_name}
                {group.id}
              </IonTitle>
              <IonLabel>Members: {group.number_of_members} </IonLabel>
              <IonItem> {shortenAddress(group.public_address)}</IonItem>
            </IonItem>
          ))
        ) : (
          <IonTitle>Loading...</IonTitle>
        )}
      </IonList>
    </IonContent>
  );
};

export default GroupRows;
