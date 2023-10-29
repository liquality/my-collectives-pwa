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
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React from "react";
import {
  searchCircleOutline,
  settingsOutline,
  peopleOutline,
  medalOutline,
} from "ionicons/icons";

const TabsMenu = ({ children }: { children?: React.ReactNode }) => {
  return (
    <IonTabs>
      {children}
      <IonTabBar slot="bottom">
        <IonTabButton tab="discover" href="/discover">
          <IonIcon icon={searchCircleOutline} />
          <IonLabel>Discover</IonLabel>
        </IonTabButton>
        <IonTabButton tab="mint" href="/mint">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Mint</IonLabel>
        </IonTabButton>
        <IonTabButton tab="rewards" href="/rewards">
          <IonIcon icon={medalOutline} />
          <IonLabel>Rewards</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/settings">
          <IonIcon icon={settingsOutline} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsMenu;
