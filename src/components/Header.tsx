import { IonHeader, IonToolbar, IonTitle, IonButton, IonButtons } from "@ionic/react";
import LogoIcon from "@/assets/logo.svg";
import { SmartWallet, SmartWalletConfig, MetaMaskWallet, EmbeddedWallet } from "@thirdweb-dev/wallets";
import { BaseGoerli as ActiveChain, updateChainRPCs } from "@thirdweb-dev/chains";
import { useState } from "react";
import ConnectModal from "./ConnectModal";
import { LocalWalletType } from "@/types/wallet";
import { useConnectedWallet, useWalletContext } from "@/utils";

  const smartWalletConfig: SmartWalletConfig = {
      chain: ActiveChain,
      factoryAddress: "0x7f81fb5b32fA60DB8ddBa9db4d1A933CD07235e9",
      gasless: true,
      clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,// Use secret key if using on the server, get it from dashboard settings
    };

  const Header: React.FC = () => {
    const [connectedModalOpen, setConnectedModalOpen] = useState(false);
    const [requestedWallet, setRequestedWallet] = useState<string>();
    const { connected, setConnected, setConnectedWallet, connectedWallet, setSmartContractWallet, smartContractWallet } = useWalletContext();
    const handleRequestedWallet = async (walletType: LocalWalletType) => {
      setRequestedWallet(walletType);

      switch (walletType) {
        case 'metamask':
          setConnectedWallet(new MetaMaskWallet({
            
          }));
          
          break;
          case 'embedded':
            setConnectedWallet(new EmbeddedWallet({
                chain: updateChainRPCs(ActiveChain), 
                clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || ''
              }));
          break;
        default:
          break;
      }

      setSmartContractWallet(new SmartWallet(smartWalletConfig));
      if(connectedWallet) {
      const connectedWalletAddress = await connectedWallet?.connect();
        const smartWalletAddress = await smartContractWallet?.connect({
          personalWallet: connectedWallet,
        });
        setConnected(true);
        console.log({ smartWalletAddress, connectedWalletAddress})
      }
    }
  
    const disconnect = async () => {
      await connectedWallet?.disconnect();
      await smartContractWallet?.disconnect();
      setConnected(false);
      console.log('wallet disconnected')
    }

    return (
        <IonHeader>
        <IonToolbar>
          <IonTitle>
            {" "}
            <img
              src={LogoIcon}
              alt=""
              height={30}
              width={30}
              style={{ verticalAlign: "middle" }}
            />{" "}
            Group Mints
          </IonTitle>
          <IonButtons slot="end">
            {connected ? <IonButton onClick={disconnect}>Disconnect</IonButton> : <IonButton onClick={() =>setConnectedModalOpen(true)}>Login</IonButton>}
      
      </IonButtons>
        </IonToolbar>
        <ConnectModal open={connectedModalOpen} setIsOpen={setConnectedModalOpen} setRequestedWallet={handleRequestedWallet}/>
      </IonHeader>
    );
  };
  
  export default Header;
  