import {
  IonContent,
  IonPage,
  IonRouterOutlet,
  useIonRouter,
} from "@ionic/react";
import { useEffect } from "react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import { Redirect, Route, RouteComponentProps, useParams } from "react-router";

import { pathConstants } from "@/utils/routeNames";

import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import CollectiveInfo from "./CollectiveInfo";
import CollectiveChat from "./CollectiveChat";
import CollectiveMint from "./CollectiveMint";

const CollectiveDetail: React.FC<RouteComponentProps> = ({ match }) => {
  const { groupId } = useParams<{ groupId: string }>();
  console.log(match, "");
  console.log(
    "groupId INSIDE COLLECTIVE DETAIL",
    "collective details",
    match,
    groupId
  );

  const { group, loading } = useGetGroupById(groupId);
  const router = useIonRouter();

  //TODO: make the logic for this more bug-proof
  //TODO: make the logic for this more bug-proof
  /*   useEffect(() => {
    if (!loading) {
      if (group?.id && groupId) {
        router.push(routes.mintPage.myCollectives);
      }
    }
  }, [group]); */

  console.log(pathConstants.collectiveDetail.info(groupId), "PATH ????");
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        {loading ? (
          <PageLoadingIndicator />
        ) : (
          <IonRouterOutlet className="app-page-router-outlet">
            <Route
              path={pathConstants.collectiveDetail.info(groupId)}
              component={CollectiveInfo}
            />
            <Route
              path={pathConstants.collectiveDetail.chat(groupId)}
              component={CollectiveChat}
            />
            <Route
              path={pathConstants.collectiveDetail.mints(groupId)}
              component={CollectiveMint}
            />
            <Route
              path={pathConstants.collectiveDetail.collectiveDetail(groupId)}
            >
              <Redirect to={pathConstants.collectiveDetail.mints(groupId)} />
            </Route>
          </IonRouterOutlet>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CollectiveDetail;
