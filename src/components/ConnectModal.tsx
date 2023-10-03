import { IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonContent, IonModal, IonItem, IonLabel, IonList } from "@ionic/react";
import { useState } from "react";

interface ConnectModalProps {
    open: boolean;
    setIsOpen: (open: boolean) => void;
    setRequestedWallet: (option: string) => void;
  }
  
  const ConnectModal: React.FC<ConnectModalProps> = ({ open, setIsOpen, setRequestedWallet }) => {
    const [walletOption, setWalletOption] = useState<string>();
    const handleDismiss = (ev: any) => {
        console.log('ev', ev);
        setRequestedWallet(walletOption || '')
    }

    const handleSetWalletOption = (option: string) => {
        setWalletOption(option);
        setIsOpen(false)
    }

    return (
        <IonModal isOpen={open} onWillDismiss={(ev) => handleDismiss(ev)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login Options</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonList>
      <IonItem button onClick={() => handleSetWalletOption('metamask')}>
        <IonLabel>Metamask</IonLabel>
      </IonItem>
      <IonItem button onClick={() => handleSetWalletOption('embedded')}>
        <IonLabel>Email</IonLabel>
      </IonItem>
    </IonList>
        </IonContent>
      </IonModal>
    );
  };
  
  export default ConnectModal;
  