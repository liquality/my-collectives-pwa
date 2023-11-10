import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonProgressBar,
  IonMenuButton,
  IonBackButton,
  IonItem,
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
        <h5 className="header-title">My collective</h5>
        {children}

        <IonButtons slot="end">
          <ConnectButton />
        </IonButtons>
      </IonToolbar>
      <div className="header-title-container">
        <h2 className="ion-padding-no-border page-header-title">
          {title ? <h5 className="header-title">{title}</h5> : null}
        </h2>
      </div>
    </IonHeader>
  );
};

export default Header;
