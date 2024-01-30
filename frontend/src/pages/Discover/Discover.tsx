import Header from "@/components/Header";
import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import New from "./New";
import About from "./About";
import { pathConstants } from "@/utils/routeNames";

const Discover: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <Header title="Discover" />

      <IonContent className="ion-padding" color="light">
        <IonRouterOutlet className="app-page-router-outlet">
          <Route path={pathConstants.discover.new} component={New} exact />
          <Route path={pathConstants.discover.about} component={About} exact />
          <Redirect
            exact
            path={pathConstants.discover.discover}
            to={pathConstants.discover.new}
          />
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default Discover;
