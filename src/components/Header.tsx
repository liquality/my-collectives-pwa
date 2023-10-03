import { IonHeader, IonToolbar, IonTitle, IonButton, IonButtons } from "@ionic/react";
import LogoIcon from "@/assets/logo.svg";
import { SmartWallet, SmartWalletConfig, MetaMaskWallet, EmbeddedWallet } from "@thirdweb-dev/wallets";
import { BaseGoerli as ActiveChain, updateChainRPCs } from "@thirdweb-dev/chains";
import { useState } from "react";
import ConnectModal from "./ConnectModal";

  const Header: React.FC = () => {
    const [connectedModalOpen, setConnectedModalOpen] = useState(false);
    const [requestedWallet, setRequestedWallet] = useState<string>();
    const handleRequestedWallet = (wallet: string) => {
      setRequestedWallet(wallet);
      console.log('wallet', wallet);
    }
    // const config: SmartWalletConfig = {
    //   chain: ActiveChain,
    //   factoryAddress: "0x7f81fb5b32fA60DB8ddBa9db4d1A933CD07235e9",
    //   gasless: true,
    //   clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,// Use secret key if using on the server, get it from dashboard settings
    // };
    
    const connect = () => {
      setConnectedModalOpen(true);
      // const personalWallet = new MetaMaskWallet({
        
      // });
      // const embeddedWallet = new EmbeddedWallet({
      //   chain: updateChainRPCs(ActiveChain), 
      //   clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || '', // client ID
      // });
      // // const personalWalletAddress = await personalWallet.connect();
      // // // Then, connect the Smart wallet
      // // const smartWallet = new SmartWallet(config);
      
      // // const smartWalletAddress = await smartWallet.connect({
      // //   personalWallet: embeddedWallet,
      // // });
    
      // // const signer = await smartWallet.getSigner();
      // // const message = await signer.signMessage('test message');
      // // console.log({personalWalletAddress, smartWalletAddress, message} )
      // const address = await embeddedWallet.connect();
      // const email = await embeddedWallet.getEmail();
      // console.log({ address, email })
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
          <IonButton onClick={() =>connect()}>Login</IonButton>
      </IonButtons>
        </IonToolbar>
        <ConnectModal open={connectedModalOpen} setIsOpen={setConnectedModalOpen} setRequestedWallet={handleRequestedWallet}/>
      </IonHeader>
    );
  };
  
  export default Header;
  