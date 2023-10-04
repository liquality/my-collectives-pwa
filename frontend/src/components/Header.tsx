import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonProgressBar,
} from "@ionic/react";
import {
  SmartWallet,
  SmartWalletConfig,
  MetaMaskWallet,
  EmbeddedWallet,
  PrivateKeyWallet,
} from "@thirdweb-dev/wallets";
import {
  BaseGoerli as ActiveChain,
  updateChainRPCs,
} from "@thirdweb-dev/chains";
import { useState } from "react";
import ConnectModal from "./ConnectModal";
import { LocalWalletType } from "@/types/wallet";
import {
  globalState as State,
  useConnectedWallet,
  useWalletContext,
} from "@/utils";
import React from "react";

const smartWalletConfig: SmartWalletConfig = {
  chain: ActiveChain,
  factoryAddress: import.meta.env.VITE_THIRDWEB_FACTORY_CONTRACT,
  gasless: true,
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID, // Use secret key if using on the server, get it from dashboard settings
};

const Header: React.FC = () => {
  const [connectedModalOpen, setConnectedModalOpen] = useState(false);
  const [requestedWallet, setRequestedWallet] = useState<string>();
  const {
    connected,
    setConnected,
    setConnectedWallet,
    connectedWallet,
    setSmartContractWallet,
    smartContractWallet,
  } = useWalletContext();
  const handleRequestedWallet = async (
    walletType: LocalWalletType,
    { privateKey }: { privateKey: string }
  ) => {
    setRequestedWallet(walletType);

    switch (walletType) {
      case "privateKey":
        setConnectedWallet(new PrivateKeyWallet(privateKey));

        break;
      case "embedded":
        setConnectedWallet(
          new EmbeddedWallet({
            chain: updateChainRPCs(ActiveChain),
            clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || "",
          })
        );
        break;
      default:
        break;
    }

    const connectedWalletAddress = await connectedWallet?.connect();
      setConnected(true);
      console.log({ connectedWalletAddress });
  };

  const disconnect = async () => {
    await connectedWallet?.disconnect();
    await smartContractWallet?.disconnect();
    setConnected(false);
    console.log("wallet disconnected");
  };

  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>
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
          {connected ? (
            <IonButton onClick={disconnect}>Disconnect</IonButton>
          ) : (
            <IonButton onClick={() => setConnectedModalOpen(true)}>
              Login
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>
      <ConnectModal
        open={connectedModalOpen}
        setIsOpen={setConnectedModalOpen}
        setRequestedWallet={handleRequestedWallet}
      />
    </IonHeader>
  );
};

export default Header;
