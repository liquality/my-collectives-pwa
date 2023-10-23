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
    <IonPage className="page-padding">
      <Header />
      <IonContent>
        <IonTitle>Welcome to Group Mints</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
