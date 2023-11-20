import { routes } from "@/utils/routeNames";
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
        <IonTabButton tab="discover" href={routes.discover.discover}>
          <IonIcon src="./assets/icons/discover.svg" />
          <IonLabel>Discover</IonLabel>
        </IonTabButton>
        <IonTabButton tab="mint" href={routes.mintPage.mint}>
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
