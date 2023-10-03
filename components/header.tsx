import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import LogoIcon from "../public/images/logo.svg";
import WalletIcon from "../public/images/wallet-icon.svg";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { SmartWallet, SmartWalletConfig, MetaMaskWallet, EmbeddedWallet } from "@thirdweb-dev/wallets";
import { BaseGoerli as ActiveChain, updateChainRPCs } from "@thirdweb-dev/chains";
export default function Header() {
  const config: SmartWalletConfig = {
    chain: ActiveChain,
    factoryAddress: "0x7f81fb5b32fA60DB8ddBa9db4d1A933CD07235e9",
    gasless: true,
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,// Use secret key if using on the server, get it from dashboard settings
  };

  const connect = async () => {
    const personalWallet = new MetaMaskWallet({
      
    });
    const embeddedWallet = new EmbeddedWallet({
      chain: updateChainRPCs(ActiveChain), 
      clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID, // client ID
    
    });
    // const personalWalletAddress = await personalWallet.connect();
    // // Then, connect the Smart wallet
    // const smartWallet = new SmartWallet(config);
    
    // const smartWalletAddress = await smartWallet.connect({
    //   personalWallet: embeddedWallet,
    // });
  
    // const signer = await smartWallet.getSigner();
    // const message = await signer.signMessage('test message');
    // console.log({personalWalletAddress, smartWalletAddress, message} )
    const address = await embeddedWallet.connect();
    const email = await embeddedWallet.getEmail();
    console.log({ address, email })
  }
  return (
    <Navbar
      fixed="top"
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">
          <Image
            src={LogoIcon}
            alt=""
            height={30}
            width={30}
            className="d-inline-block align-top"
          />{" "}
          Group Mints
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            {/* <ConnectWallet
              btnTitle="Login"
              detailsBtn={() => {
                return (
                  <Image
                    src={WalletIcon}
                    alt=""
                    height={30}
                    width={30}
                  />
                );
              }}
            /> */}
            <button onClick={()=>connect()}>Login</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


       