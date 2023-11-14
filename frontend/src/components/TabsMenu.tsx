import {
  IonLabel,
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React from "react";

const TabsMenu = ({ children }: { children?: React.ReactNode }) => {
  return (
    <IonTabs>
      {children}
      <IonTabBar slot="bottom" className="app-tab-bar">
        <IonTabButton tab="discover" href="/discover/new">
        <IonIcon src="./assets/icons/discover.svg" />
          <IonLabel>Discover</IonLabel>
        </IonTabButton>
        <IonTabButton tab="mint" href="/mint">
        <IonIcon src="./assets/icons/mint.svg" />
          <IonLabel>Mint</IonLabel>
        </IonTabButton>
        <IonTabButton tab="rewards" href="/rewards">
        <IonIcon src="./assets/icons/rewards.svg" />
          <IonLabel>Rewards</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsMenu;
