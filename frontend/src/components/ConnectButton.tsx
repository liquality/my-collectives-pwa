import { shortenAddress } from "@/utils/adddress";
import {
  IonButton,
  IonContent,
  IonPopover,
  IonIcon,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { logIn, logOut, wallet, key, copy, copyOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { useSignInWallet } from "@/hooks/useSignInWallet";

const ConnectButton: React.FC = () => {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { user } = useSignInWallet();

  const logout = () => {
    localStorage.removeItem('groupMints.accessToken');
    localStorage.removeItem('groupMints.user');
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
        <IonButton onClick={login}>
          {isConnecting ? (
            <IonSpinner name="circular" />
          ) : (
            <>
              <IonIcon slot="end" icon={logIn}></IonIcon>
              Connect Wallet
            </>
          )}
        </IonButton>
      ) : (
        <>
          <IonButton id="logout-options-triggger">
            <IonIcon slot="end" icon={wallet}></IonIcon>
            {shortenAddress(address || "")}
          </IonButton>
          <IonPopover
            size="auto"
            className="dark-ion-popover"
            trigger="logout-options-triggger"
            dismissOnSelect={true}
            showBackdrop={false}
          >
            <IonContent>
              <IonCard color="primary">
                <IonCardContent>
                  <IonGrid>
                    {/* <IonRow className="flex-flow-row">
                      <IonCol className="align-items-center">
                        <IonIcon icon={key}></IonIcon>
                        {shortenAddress(address)}
                      </IonCol>
                      <IonCol>
                      <IonButton onClick={copyAddress}>
                          <IonIcon slot="icon-only" icon={copyOutline}></IonIcon>
                        </IonButton>
                      </IonCol>
                    </IonRow> */}
                    <IonRow>
                      <IonCol>
                        <IonButton onClick={logout}>
                          <IonIcon slot="end" icon={logOut}></IonIcon>
                          Logout
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonPopover>
        </>
      )}
    </>
  );
};

export default ConnectButton;
