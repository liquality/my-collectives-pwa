import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkAuth } from "@/utils";
import React from "react";
import Header from "@/components/Header";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <Header title="Settings"/>
      <IonContent  className="ion-padding"  color="light">
        <IonTitle>Welcome to Group Mints</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
