import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import Settings from "./pages/Pools";
import Invite from "./pages/Invite";
import Room from "./pages/Room";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import React from "react";
/* Theme variables */
import "./theme/variables.css";
import "./theme/main.css";
import Menu from "./components/Menu";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import Pools from "./pages/Pools";
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { baseGoerli } from 'wagmi/chains';

setupIonicReact({
  mode: "ios",
});

// Auth and Wallet setup
const { chains, publicClient } = configureChains([baseGoerli], [publicProvider()])
 
const config = createConfig({
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
        metadata: {
          name: 'Group Mints',
          description: 'Liquality Group Mints',
          url: 'https://liquality.io',
          icons: ['https://uploads-ssl.webflow.com/63e610c62d73bd54e8ee8455/63e610c62d73bd46ffee8583_Liquality_logo.svg']
        }
      },
    }),
  ],
  publicClient,
})


const App: React.FC = () => {
  return (
  <WagmiConfig config={config}>
    <IonApp>
      <IonSplitPane when="sm" contentId="main-content">
        <IonReactRouter>
          <Menu />
          <IonRouterOutlet id="main-content">
            <Route path="/home" exact>
              <Home />
            </Route>
            <Route path="/groups" exact>
              <Groups />
            </Route>
            <Route path="/pools" exact>
              <Pools />
            </Route>
            <Route path="/settings" exact>
              <Settings />
            </Route>
            <Route path="/room" exact>
              <Room />
            </Route>
            <Route path="/login" component={Login} exact />
            <Route path="/invite/:inviteLink" component={Invite} />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonSplitPane>
    </IonApp>
  </WagmiConfig>
);
};

export default App;
