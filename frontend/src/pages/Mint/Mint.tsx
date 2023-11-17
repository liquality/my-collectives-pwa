import {
  IonContent,
  IonPage,
  IonRouterOutlet,
  useIonRouter,
} from "@ionic/react";
import { useEffect } from "react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import { Redirect, Route, RouteComponentProps } from "react-router";
import MintGroupsContent from "./MintGroupsContent";
import NoGroups from "./NoGroups";
import CreateCollective from "./CreateCollective";
import ManageCollective from "./ManageCollective";
import { routes } from "@/utils/routeNames";
import CollectiveInvites from "./CollectiveInvites";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";

const Mint: React.FC<RouteComponentProps> = ({ match }) => {
  const { myGroups, loading } = useGetMyGroups();
  const router = useIonRouter();

  //TODO: make the logic for this more bug-proof
  useEffect(() => {
    if (!loading) {
      if (myGroups && myGroups.length > 0) {
        router.push(routes.mintPage.myCollectives);
      } else if (myGroups && !myGroups.length) {
        router.push(routes.mintPage.noCollectives);
      }
    }
  }, [myGroups]);

  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        {loading ? (
          <PageLoadingIndicator />
        ) : (
          <IonRouterOutlet className="app-page-router-outlet">
            <Route
              path={routes.mintPage.createCollective}
              component={CreateCollective}
              exact
            />
            <Route
              path={routes.mintPage.manageCollective}
              component={ManageCollective}
              exact
            />
            <Route
              path={routes.mintPage.myCollectives}
              component={MintGroupsContent}
              exact
            />
            <Route
              path={routes.mintPage.noCollectives}
              component={NoGroups}
              exact
            />
            <Route
              path={routes.mintPage.collectiveInvites}
              component={CollectiveInvites}
              exact
            />

            <Route exact path={routes.mintPage.mint}>
              <Redirect
                to={
                  myGroups
                    ? routes.mintPage.myCollectives
                    : routes.mintPage.noCollectives
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
