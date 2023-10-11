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
  IonAvatar,
  IonButtons,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logIn, logOut, wallet, key, copy, copyOutline } from "ionicons/icons";
import React, { useRef } from "react";
import { useAccount, useDisconnect, useConnect, Connector } from "wagmi";

const walletIcons: Record<string, string> = {
  metaMask:
    "https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/SVG_MetaMask_Icon_Color.svg",
  walletConnect:
    "https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg",
};
const ConnectButton: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }
  const {
    address,
    connector: activeConnector,
    isConnecting,
    isConnected,
  } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const logout = () => {
    disconnect();
  };

  const handleConnect = (connector: Connector) => {
    connect({ connector });
    modal.current?.dismiss();
  };

  const copyAddress = () => {};

  return (
    <>
      {isConnected ? (
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
      ) : (
        <>
          <IonButton id="open-auth-modal">
            {isConnecting ? (
              <IonSpinner name="circular" />
            ) : (
              <>
                <IonIcon slot="end" icon={logIn}></IonIcon>
                Connect Wallet
              </>
            )}
          </IonButton>
          <IonModal ref={modal} trigger="open-auth-modal">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Modal</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => dismiss()}>Close</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonList>
                {connectors.map((connector) => (
                  <IonItem
                    button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => handleConnect(connector)}
                  >
                    <IonAvatar slot="start">
                      <IonImg src={walletIcons[connector.id]} />
                    </IonAvatar>
                    <IonLabel>
                      <h2>
                        {connector.name}
                        {isLoading &&
                          pendingConnector?.id === connector.id &&
                          " (connecting)"}
                      </h2>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonContent>
          </IonModal>
        </>
      )}
    </>
  );
};

export default ConnectButton;
