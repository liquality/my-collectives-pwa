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
  useIonRouter
} from "@ionic/react";
import React from "react";

import { searchCircleOutline, settingsOutline, peopleOutline, medalOutline } from "ionicons/icons";

const SideBarMenu: React.FC = () => {
  const { routeInfo } = useIonRouter();
  console.log(routeInfo, "routeInfo");
  const isActive = (path: string) => routeInfo.pathname.startsWith(`/${path}`);
  return (
    <IonMenu type="push" contentId="main-content">
      <IonHeader  className="ion-no-border">
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
        <IonList lines="none">
          <IonListHeader>
            <IonLabel>Group Mints</IonLabel>
          </IonListHeader>
          <IonItem button detail={false} 
          routerLink="/discover" 
          routerDirection="root"
          color={isActive("discover") ? "light" : ""}>
            <IonIcon icon={searchCircleOutline} slot="start"/>
            <IonLabel>Discover</IonLabel>
          </IonItem>
          <IonItem button detail={false} 
          routerLink="/mint"
          routerDirection="root"
          color={isActive("mint") ? "light" : ""}>
            <IonIcon icon={peopleOutline} slot="start"/>
            <IonLabel>Mint</IonLabel>
          </IonItem>
          <IonItem button detail={false} 
          routerLink="/rewards"
          routerDirection="root"
          color={isActive("rewards") ? "light" : ""}>
          <IonIcon icon={medalOutline} slot="start"/>
            <IonLabel>Rewards</IonLabel>
          </IonItem>

          <IonItem button detail={false} 
          routerLink="/settings"
          routerDirection="root"
          color={isActive("settings") ? "light" : ""}>
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
