import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonMenu,
  IonMenuToggle,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
} from "@ionic/react";
import React from "react";
import { settingsOutline, chatbubblesOutline } from "ionicons/icons";

const Menu: React.FC = () => {
  return (
    <IonMenu type="push" contentId="main-content">
    <IonHeader collapse="fade">
      <IonToolbar> <IonTitle>
          <img
            src="/logo.svg"
            alt=""
            height={35}
            width={35}
            style={{ verticalAlign: "middle" }}
          />
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
    <IonList lines="none" inset={true}>
    <IonListHeader>
        <IonLabel>Group Mints</IonLabel>
      </IonListHeader>
      <IonItem button detail={false} routerLink="/home">
          <IonLabel>Home</IonLabel>
        </IonItem>
        <IonItem button detail={false} routerLink="/groups">
          <IonLabel>My Groups</IonLabel>
        </IonItem>
        <IonItem button detail={false} routerLink="/pools">
          <IonLabel>My Pools</IonLabel>
        </IonItem>
      </IonList>
      <IonMenuToggle>
        <IonButton>Close</IonButton>
      </IonMenuToggle>
    </IonContent>
  </IonMenu>
  );
};

export default Menu;
