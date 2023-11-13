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
  size?: "small" | "big";
  children?: React.ReactNode;
}
const Header = ({ title, size, children }: HeaderProps) => {
  const headerStyle = {
    height: size === "big" || !size ? "23%" : "20%", //default to big size if no size specified
  };
  return (
    <IonHeader
      className="ion-padding ion-no-border custom-header"
      style={headerStyle}
    >
      <IonToolbar>
        {isPlatform("desktop") ? (
          <IonLabel className="header-title-text">{title}</IonLabel>
        ) : (
          <IonLabel className="app-title-text">MyCollective</IonLabel>
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
