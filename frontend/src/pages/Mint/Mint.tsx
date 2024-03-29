import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import {
  Redirect,
  Route,
  RouteComponentProps,
  useLocation,
} from "react-router";
import MintCollectiveContent from "./MintCollectiveContent";
import NoGroups from "./NoGroups";
import CreateCollective from "./CreateCollective";
import { pathConstants } from "@/utils/routeNames";
import MyMints from "./MyMints";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import CollectiveDetail from "./CollectiveDetail/CollectiveDetail";
import NFTPage from "./NFTPage";
import { useEffect } from "react";

const Mint: React.FC<RouteComponentProps> = (routerProps) => {
  const { loading } = useGetMyGroups();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith(pathConstants.collective.collective)) {
      routerProps.history.replace(pathConstants.mintPage.myCollectives);
    }
  }, []);

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
            />

            <Route
              path={pathConstants.mintPage.myCollectives}
              component={MintCollectiveContent}
            />
            <Route
              path={pathConstants.mintPage.noCollectives}
              component={NoGroups}
            />
            <Route path={pathConstants.mintPage.mymints} component={MyMints} />

            <Route
              path={pathConstants.collective.collective}
              component={CollectiveDetail}
            />

            <Route
              path={pathConstants.mintPage.nftPage}
              component={NFTPage}
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
