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
  IonButton,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import ConnectButton from "./ConnectButton";
import React from "react";
import {
  arrowBackCircleOutline,
  chevronBackOutline,
  closeOutline,
} from "ionicons/icons";

export interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}
const Header = ({ title, children }: HeaderProps) => {
  const router = useIonRouter();
  return (
    /*     <IonHeader className="ion-padding ion-no-border app-header">
      <IonToolbar>
        {isPlatform("desktop") ? (
          <IonLabel className="header-title-text">{title} bää</IonLabel>
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
              <IonLabel className="header-title-text">{title} bäääEE</IonLabel>
            ) : null}
          </div>
        </div>
      )}
      {children}
    </IonHeader> */

    <IonHeader slot="start" className="ion-padding ion-no-border app-header ">
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton color="dark" onClick={() => router.goBack()}>
            <IonIcon icon={chevronBackOutline} />
          </IonButton>
        </IonButtons>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          <ConnectButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
