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

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {checkAuth() ? (
              <IonText>Home Page</IonText>
            ) : (
              <IonText>Login Page</IonText>
            )}{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Auth />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
