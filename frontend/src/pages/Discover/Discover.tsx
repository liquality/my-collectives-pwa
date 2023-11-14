import Header from "@/components/Header";
import {
  IonContent,
  IonPage,
  IonRouterOutlet,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import New from "./New";
import About from "./About";
import PageTopBar from "@/components/PageTopBar";

const Discover: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <Header title="Discover" />
      <IonContent className="ion-padding" color="light">
        <IonRouterOutlet className="app-page-router-outlet">
          <Route path={`/discover/new`} component={New} exact />
          <Route path={`/discover/about`} component={About} exact />

          <Route exact path="/discover">
            <Redirect to="/discover/new" />
          </Route>
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default Discover;
