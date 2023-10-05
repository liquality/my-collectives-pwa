import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { settingsOutline, chatbubblesOutline } from "ionicons/icons";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
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
import Header from "@/components/Header";
import { WalletProvider } from "@/utils";
import React from "react";
/* Theme variables */
import "./theme/variables.css";
import "./theme/main.css";

setupIonicReact({
  mode: "ios",
});

const App: React.FC = () => (
  <WalletProvider>
    <IonApp>
      <Header />
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/room">
              <Room />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/invite/:inviteLink" component={Invite} />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/room">
              <IonIcon aria-hidden="true" icon={chatbubblesOutline} />
              <IonLabel>Room</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/settings">
              <IonIcon aria-hidden="true" icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </WalletProvider>
);

export default App;
