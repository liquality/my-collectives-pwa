import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Auth from "@/components/Auth";
import { checkAuth } from "@/utils";
import React from "react";
import Header from "@/components/Header";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <Auth />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
