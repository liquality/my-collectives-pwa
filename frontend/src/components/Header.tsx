import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonProgressBar,
  IonMenuButton,
  IonBackButton,
} from "@ionic/react";
import ConnectButton from "./ConnectButton";
import React from "react";

export interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}
const Header = ({ title, children }: HeaderProps) => {
  return (
    <IonHeader  className="ion-no-border">
      <IonToolbar>
        {title ? (
          <IonTitle
          className="ion-padding"
            slot="start"
          >
            {title}
          </IonTitle>
        ) : null}
       { children }
        <IonButtons slot="end">
          <ConnectButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
