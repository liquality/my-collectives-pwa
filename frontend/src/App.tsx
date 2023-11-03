import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Invite from "./pages/Invite";

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
import SideBarMenu from "./components/SideBarMenu";
import TabsMenu from "./components/TabsMenu";
import Mint from "./pages/Mint/Mint";
import Discover from "./pages/Discover";
import Pools from "./pages/Pools";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { baseGoerli } from "wagmi/chains";
import Messages from "./pages/Messages";
import ProtectedRoute from "./components/ProtectedRoute";
import Pool from "./pages/Pool";
import useWindowDimensions from "./hooks/userWindowsDimensions";
import Rewards from "./pages/Rewards";
import { useSignInWallet } from "./hooks/useSignInWallet";

setupIonicReact({
  mode: "ios",
});

// 1. Get projectId
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

// 2. Create wagmiConfig
const metadata = {
  name: "Group Mints",
  description: "Liquality Group Mints",
  url: "https://liquality.io",
  icons: [
    "https://uploads-ssl.webflow.com/63e610c62d73bd54e8ee8455/63e610c62d73bd46ffee8583_Liquality_logo.svg",
  ],
};

const chains = [baseGoerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });
const App: React.FC = () => {
  const { isDesktop } = useWindowDimensions();
  const routerOutlet = (
    <IonRouterOutlet id="main-content">
      {/* Routes not requiring authentication */}
      <Route path="/login" render={() => <Login />} exact />
      <Route path="/messages/:groupId" render={() => <Messages />} />
      <Route path="/invite/:inviteLink" render={() => <Invite />} />
      <Route path="/discover" render={() => <Discover />} exact />
      <Route path="/mint" render={() => <Mint />} exact />
      <Route path="/pools" render={() => <Pools />} exact />
      <Route path="/rewards" render={() => <Rewards />} exact />
      
      {/* Default route (not requiring authentication) */}
      <Route exact path="/">
        <Redirect to="/discover" />
      </Route>

      {/* Protected routes, needs auth */}
      <ProtectedRoute>
        <Route path="/pools/:id" render={() => <Pool />} exact />
        <Route path="/settings" render={() => <Settings />} exact />
      </ProtectedRoute>
    </IonRouterOutlet>
  );

  const Main = () => {
    useSignInWallet();
      return (<IonApp>
        {isDesktop ? (
          <IonSplitPane when="md" contentId="main-content">
            <IonReactRouter>
              <SideBarMenu />
              {routerOutlet}
            </IonReactRouter>
          </IonSplitPane>
        ) : (
          <IonReactRouter>
            <TabsMenu>{routerOutlet}</TabsMenu>
          </IonReactRouter>
        )}
      </IonApp>)
  }
  return (
    <WagmiConfig config={wagmiConfig}>
      <Main />
      
    </WagmiConfig>
  );
};

export default App;
