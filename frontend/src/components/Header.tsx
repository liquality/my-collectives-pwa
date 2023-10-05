import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonProgressBar,
} from "@ionic/react";
import ConnectButton from "./ConnectButton";
import {
  globalState as State
} from "@/utils";
import React from "react";


const Header: React.FC = () => {
  return (
    <IonHeader > 
      <IonToolbar color="primary">
        <IonTitle class="ion-text-left" style={{ paddingInline: 20 }}>
          {" "}
          <img
            src="/logo.svg"
            alt=""
            height={30}
            width={30}
            style={{ verticalAlign: "middle" }}
          />{" "}
          Group Mints
        </IonTitle>
        {State.loading ? (
          <IonProgressBar
            color="secondary"
            type="indeterminate"
          ></IonProgressBar>
        ) : null}
        <IonButtons slot="end">
          <ConnectButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
