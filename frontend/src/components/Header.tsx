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


const Header: React.FC = () => {
  return (
    <IonHeader collapse="fade"> 
      <IonToolbar>
      <IonButtons slot="start">
       <IonMenuButton></IonMenuButton>
       </IonButtons>
        <IonButtons slot="end">
          <ConnectButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
