import { shortenAddress } from "@/utils/adddress";
import {
  IonButton,
  IonContent,
  IonPopover,
  IonIcon,
  IonSpinner,
  IonItem,
  IonList,
  IonLabel,
  isPlatform,
} from "@ionic/react";
import { logIn, logOut, wallet } from "ionicons/icons";
import React from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

const ConnectButton: React.FC = () => {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  const logout = () => {
    localStorage.removeItem("groupMints.accessToken");
    localStorage.removeItem("groupMints.user");
    disconnect();
  };

  const login = async () => {
    try {
      await open();
    } catch (error) {
      console.error(error);
      // TODO: show error message to the users
    }
  };

  return (
    <>
      {isDisconnected ? (
        <IonButton className="login-button" onClick={login}>
          {isConnecting ? <IonSpinner name="circular" /> : <>Connect</>}
        </IonButton>
      ) : (
        <>
          <IonButton className="logged-in-button" id="logout-options-triggger">
            {shortenAddress(address || "")}
          </IonButton>
          <IonPopover
            size="auto"
            trigger="logout-options-triggger"
            dismissOnSelect={true}
            showBackdrop={false}
          >
            <IonContent className="ion-padding">
              <IonList lines="none">
                <IonItem button={true} detail={false} onClick={logout}>
                  <IonLabel>Logout</IonLabel>
                  <IonIcon slot="end" icon={logOut}></IonIcon>
                </IonItem>
              </IonList>
            </IonContent>
          </IonPopover>
        </>
      )}
    </>
  );
};

export default ConnectButton;
