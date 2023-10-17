import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
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
            <IonLabel>{group.group_name} </IonLabel>
            <IonTitle>Brää</IonTitle>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default GroupRows;
