import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonProgressBar,
  IonMenuButton,
  IonBackButton,
  IonItem,
  isPlatform,
  IonLabel,
} from "@ionic/react";
import ConnectButton from "./ConnectButton";
import React from "react";

export interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}
const Header = ({ title, children }: HeaderProps) => {
  return (
    <IonHeader className="ion-padding ion-no-border app-header">
      <IonToolbar>
        {isPlatform("desktop") ? (
          <IonLabel className="header-title-text">{title}</IonLabel>
        ) : (
          <IonLabel className="app-title-text">MyCollective.tech</IonLabel>
        )}
        <IonButtons slot="end">
          <ConnectButton />
        </IonButtons>
      </IonToolbar>
      {!isPlatform("desktop") && (
        <div className="header-title-container">
          <div className="ion-padding-no-border page-header-title">
            {title ? (
              <IonLabel className="header-title-text">{title}</IonLabel>
            ) : null}
          </div>
        </div>
      )}
      {children}
    </IonHeader>
  );
};

export default Header;
