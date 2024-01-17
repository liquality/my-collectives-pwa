import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { pathConstants } from "@/utils/routeNames";
import {
  IonLabel,
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React from "react";
import MenuIcon from "./MenuIcon";
export interface TabBarMenuProps {
  hideOn?: string[];
  children?: React.ReactNode;
}
const TabsMenu: React.FC<TabBarMenuProps> = ({
  children,
  hideOn,
}: TabBarMenuProps) => {
  const isActive = useIsActiveRoute();
  if (hideOn?.some((path) => isActive(path))) {
    return children;
  }
  return (
    <IonTabs>
      {children}
      <IonTabBar slot="bottom" className="app-tab-bar">
        <IonTabButton tab="discover" href={pathConstants.discover.discover}>
          <MenuIcon icon="discover" route={pathConstants.discover.discover} />
          <IonLabel>Discover</IonLabel>
        </IonTabButton>
        <IonTabButton tab="mint" href={pathConstants.mintPage.mint}>
          <MenuIcon icon="mint" route={pathConstants.mintPage.mint} />
          <IonLabel>Mint</IonLabel>
        </IonTabButton>
        <IonTabButton tab="rewards" href={pathConstants.rewards.index}>
          <MenuIcon icon="rewards" route={pathConstants.rewards.index} />
          <IonLabel>Rewards</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsMenu;
