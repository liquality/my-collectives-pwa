import {
  IonContent,
  IonPage,
  IonRouterOutlet,
  useIonRouter,
} from "@ionic/react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import {
  Redirect,
  Route,
  RouteComponentProps,
  useLocation,
  useParams,
} from "react-router";
import MintCollectiveContent from "./MintCollectiveContent";
import NoGroups from "./NoGroups";
import CreateCollective from "./CreateCollective";
import ManageCollective from "./ManageCollective";
import { pathConstants } from "@/utils/routeNames";
import MyMints from "./MyMints";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { useEffect } from "react";

const Mint: React.FC<RouteComponentProps> = ({ match }) => {
  const { myGroups, loading } = useGetMyGroups();
  const router = useIonRouter();

  const location = useLocation();

  //TODO: make the logic for this more bug-proof

  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        {loading ? (
          <PageLoadingIndicator />
        ) : (
          <IonRouterOutlet className="app-page-router-outlet">
            <Route
              path={pathConstants.mintPage.createCollective}
              component={CreateCollective}
              exact
            />
            <Route
              path={pathConstants.mintPage.manageCollective}
              component={ManageCollective}
              exact
            />
            <Route
              path={pathConstants.mintPage.myCollectives}
              component={MintCollectiveContent}
              exact
            />
            <Route
              path={pathConstants.mintPage.noCollectives}
              component={NoGroups}
              exact
            />
            <Route
              path={pathConstants.mintPage.mymints}
              component={MyMints}
              exact
            />

            <Route exact path={pathConstants.mintPage.mint}>
              <Redirect
                to={
                  pathConstants.mintPage.myCollectives //mintCollectiveContent
                }
              />
            </Route>
          </IonRouterOutlet>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Mint;
