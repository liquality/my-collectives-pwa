import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { pathConstants } from "@/utils/routeNames";
import Summary from "./Summary";
import Airdrops from "./Airdrops";

const Rewards: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <IonRouterOutlet className="app-page-router-outlet">
          <Route
            path={pathConstants.rewards.summary}
            component={Summary}
            exact
          />
          <Route
            path={pathConstants.rewards.airdrops}
            component={Airdrops}
            exact
          />

          <Route exact path={pathConstants.rewards.index}>
            <Redirect to={pathConstants.rewards.summary} />
          </Route>
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default Rewards;
