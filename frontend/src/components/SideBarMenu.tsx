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
  useIonRouter,
} from "@ionic/react";
import React from "react";
import useIsActiveRoute from "@/hooks/useIsActiveRoute";

export interface SideBarMenuProps {
  hideOn?: string[]
}
const SideBarMenu: React.FC<SideBarMenuProps> = ({ hideOn }: SideBarMenuProps ) => {
  const isActive = useIsActiveRoute();
  if(hideOn?.some(path => isActive(path))) {
    return null
  }

  return (
    <IonMenu type="push" contentId="main-content">
      <IonHeader className="ion-padding ion-no-border">
        <IonToolbar>
          <IonTitle>
            <IonLabel className="app-title-text">MyCollective.tech</IonLabel>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList lines="none" className="app-side-menu">
          <IonItem
            button
            detail={false}
            routerLink="/discover/new"
            routerDirection="root"
            color={isActive("/discover") ? "light" : ""}
          >
            <IonIcon
              color={isActive("/discover") ? "primary" : ""}
              src="/assets/icons/discover.svg"
              slot="start"
            />
            <IonLabel color={isActive("/discover") ? "primary" : ""}>
              Discover
            </IonLabel>
          </IonItem>
          <IonItem
            button
            detail={false}
            routerLink="/mint"
            routerDirection="root"
          >
            <IonIcon
              color={isActive("/mint") ? "primary" : ""}
              src="/assets/icons/mint.svg"
              slot="start"
            />
            <IonLabel color={isActive("/mint") ? "primary" : ""}>Mint</IonLabel>
          </IonItem>
          <IonItem
            button
            detail={false}
            routerLink="/rewards"
            routerDirection="root"
          >
            <IonIcon
              color={isActive("/rewards") ? "primary" : ""}
              src="/assets/icons/rewards.svg"
              slot="start"
            />
            <IonLabel color={isActive("/rewards") ? "primary" : ""}>
              Rewards
            </IonLabel>
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
