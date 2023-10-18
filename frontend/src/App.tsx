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
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { baseGoerli } from "wagmi/chains";
import Messages from "./pages/Messages";
import ProtectedRoute from "./components/ProtectedRoute";

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
const App: React.FC = () => (
  <WagmiConfig config={wagmiConfig}>
    <IonApp>
      <IonSplitPane when="sm" contentId="main-content">
        <IonReactRouter>
          <Menu />
          <IonRouterOutlet id="main-content">
            {/* Routes not requiring authentication */}
            <Route path="/login" component={Login} exact />
            <Route path="/messages/:groupId" component={Messages} />
            <Route path="/invite/:inviteLink" component={Invite} />

            {/* Default route (not requiring authentication) */}
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>

            {/* Protected routes */}
            <ProtectedRoute>
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
            </ProtectedRoute>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonSplitPane>
    </IonApp>
  </WagmiConfig>
);

export default App;
