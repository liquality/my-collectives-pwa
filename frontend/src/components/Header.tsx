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
  goBack?: boolean
}

const BackButton = () => {
  const router = useIonRouter();
  return (
    <IonButton className="header-back-button" 
    fill="clear" color="dark" onClick={() => router.goBack()}>
      <IonIcon icon={chevronBackOutline} />
    </IonButton>
  );
};
const Header = ({ title, children, goBack }: HeaderProps) => {
  return (
    <IonHeader slot="start" className="ion-padding ion-no-border app-header">
      <IonToolbar>
        {isPlatform("desktop") ? (
          <>
            <IonButtons slot="start">
              {goBack && <BackButton />}
            </IonButtons>
            <IonLabel className="header-title-text">{title}</IonLabel>
          </>
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
          {goBack && <BackButton />}
            {title ? (
              <>
                <IonLabel className="header-title-text">{title}</IonLabel>
              </>
            ) : null}
          </div>
        </div>
      )}
      {children}
    </IonHeader>

    // <IonHeader slot="start" className="ion-padding ion-no-border app-header ">
    //   <IonToolbar>
    //     <IonButtons slot="start">
    //       <IonButton color="dark" onClick={() => router.goBack()}>
    //         <IonIcon icon={chevronBackOutline} />
    //       </IonButton>
    //     </IonButtons>
    //     <IonTitle>{title}</IonTitle>
    //     <IonButtons slot="end">
    //       <ConnectButton />
    //     </IonButtons>
    //   </IonToolbar>
    // </IonHeader>
  );
};

export default Header;
