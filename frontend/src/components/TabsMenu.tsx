import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { routes } from "@/utils/routeNames";
import {
  IonLabel,
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React from "react";
export interface TabBarMenuProps {
  hideOn?: [string];
  children?: React.ReactNode;
}
const TabsMenu: React.FC<TabBarMenuProps> = ({ children, hideOn }: TabBarMenuProps) => {
  const isActive = useIsActiveRoute();
  if (hideOn?.some((path) => isActive(path))) {
    return children;
  }
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
