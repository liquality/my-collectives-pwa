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
    height: size === "big" || !size ? "25%" : "20%", //default to big size if no size specified
  };
  return (
    <IonHeader className="ion-no-border custom-header" style={headerStyle}>
      <IonToolbar>
        {title ? (
          <IonTitle className="ion-padding header-title">
            My collective
          </IonTitle>
        ) : null}
        {children}

        <IonButtons slot="end">
          <ConnectButton />
        </IonButtons>
      </IonToolbar>
      <IonItem className="flexDirectionCol">
        <IonTitle className="ion-padding-no-border page-header-title">
          Discover
        </IonTitle>
      </IonItem>
    </IonHeader>
  );
};

export default Header;
