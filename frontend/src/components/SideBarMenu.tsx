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
  IonIcon,
} from "@ionic/react";
import React from "react";

import { searchCircleOutline, settingsOutline, peopleOutline, medalOutline } from "ionicons/icons";

const SideBarMenu: React.FC = () => {
  return (
    <IonMenu type="push" contentId="main-content">
      <IonHeader collapse="fade">
        <IonToolbar>
          {" "}
          <IonTitle>
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
            <IonIcon icon={searchCircleOutline} slot="start"/>
            <IonLabel>Discover</IonLabel>
          </IonItem>
          <IonItem button detail={false} routerLink="/groups">
            <IonIcon icon={peopleOutline} slot="start"/>
            <IonLabel>Mint</IonLabel>
          </IonItem>
          <IonItem button detail={false} routerLink="/rewards">
          <IonIcon icon={medalOutline} slot="start"/>
            <IonLabel>Rewards</IonLabel>
          </IonItem>

          <IonItem button detail={false} routerLink="/settings">
          <IonIcon icon={settingsOutline} slot="start"/>
            <IonLabel>Settings</IonLabel>
          </IonItem>
        </IonList>
        <IonMenuToggle>
          <IonButton>Close</IonButton>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
};

export default SideBarMenu;
