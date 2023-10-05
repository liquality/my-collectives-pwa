import { LocalWalletType } from "@/types/wallet";
import { useWalletContext } from "@/utils";
import { shortenAddress } from "@/utils/adddress";
import {
  IonButton,
  IonContent,
  IonItem,
  IonList,
  IonPopover,
  IonIcon,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonLabel,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { logIn, logOut, wallet, key, copy, copyOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
// import { setup } from "@liquality/safe-wrapper";

const ConnectButton: React.FC = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { walletLoading, connected, setConnected, connectedWallet } =
    useWalletContext();

  const logout = () => {
    connectedWallet?.disconnect();
    setConnected(false);
  };

  const login = async () => {
    setLoading(true);
    try {
      const _address = await connectedWallet?.connect();
      if (_address) {
        setAddress(_address);
        setConnected(true);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const copyAddress = () => {};

  const runSetup = async () => {
    if (connectedWallet) {
      // const signer = await connectedWallet?.getSigner();
      // setup({
      //   signer,
      //   rpcUrl: import.meta.env.VITE_RPC_URL,
      //   gelatoRelayApiKey: import.meta.env.VITE_GELATO_API_KEY,
      //   appName: "Group Mints",
      // });
    }
  };

  useEffect(() => {
    const setup = async () => {
      if (!walletLoading && connected && !address) {
        setLoading(true);
        const _address = await connectedWallet?.getAddress();
        if (_address) {
          setAddress(_address);
        }
        setLoading(false);
      }
    };
    setup();
  });
  return (
    <>
      {connected ? (
        <>
          <IonButton id="logout-options-triggger">
            <IonIcon slot="end" icon={wallet}></IonIcon>
            {shortenAddress(address)}
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
                    <IonRow>
                      <IonCol>
                        <IonButton onClick={runSetup}>Setup</IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonPopover>
        </>
      ) : (
        <IonButton onClick={login}>
          {loading ? (
            <IonSpinner name="circular" />
          ) : (
            <>
              <IonIcon slot="end" icon={logIn}></IonIcon>
              {walletLoading ? "..." : "Connect Wallet"}
            </>
          )}
        </IonButton>
      )}
    </>
  );
};

export default ConnectButton;
