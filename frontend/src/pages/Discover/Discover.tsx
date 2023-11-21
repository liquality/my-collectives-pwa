import Header from "@/components/Header";
import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import New from "./New";
import About from "./About";
import { routes } from "@/utils/routeNames";

const Discover: React.FC<RouteComponentProps> = ({ match }) => {
  const { discover: discoverRoutes } = routes;
  return (
    <IonPage>
      <Header title="Discover" />

      <IonContent className="ion-padding" color="light">
        <IonRouterOutlet className="app-page-router-outlet">
          <Route path={routes.discover.new} component={New} exact />
          <Route path={routes.discover.about} component={About} exact />
          <Route exact path={routes.discover.discover}>
            <Redirect to={routes.discover.new} />
          </Route>
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default Discover;
