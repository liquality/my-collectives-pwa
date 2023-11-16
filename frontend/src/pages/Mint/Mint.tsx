import {
  IonContent,
  IonPage,
  IonRouterOutlet,
  useIonRouter,
} from "@ionic/react";
import { useEffect } from "react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import { Route, RouteComponentProps } from "react-router";
import MintGroupsContent from "./MintGroupsContent";
import NoGroups from "./NoGroups";
import CreateCollective from "./CreateCollective";
import ManageCollective from "./ManageCollective";
import { routes } from "@/utils/routeNames";
import CollectiveInvites from "./CollectiveInvites";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";

const Mint: React.FC<RouteComponentProps> = ({ match }) => {
  const { myGroups, loading, reload } = useGetMyGroups();

  const router = useIonRouter();
  console.log(myGroups, "myg grouups");

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
          </IonRouterOutlet>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Mint;
