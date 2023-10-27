import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonProgressBar,
  IonMenuButton,
} from "@ionic/react";
import ConnectButton from "./ConnectButton";
import React from "react";

const Header = ({ title }: { title?: string }) => {
  return (
    <IonHeader  className="ion-no-border">
      <IonToolbar>
        {title ? (
          <IonTitle
          className="ion-padding"
            style={{ textAlign: "left" }}
            slot="start"
          >
            {title}
          </IonTitle>
        ) : null}
        <IonButtons slot="end">
          <ConnectButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
