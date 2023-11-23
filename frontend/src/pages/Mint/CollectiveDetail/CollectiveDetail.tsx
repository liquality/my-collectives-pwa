import {
  IonContent,
  IonPage,
  IonRouterOutlet,
  useIonRouter,
} from "@ionic/react";
import { useEffect } from "react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import { Redirect, Route, RouteComponentProps, useParams } from "react-router";

import { routes } from "@/utils/routeNames";

import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import CollectiveInfo from "./CollectiveInfo";
import CollectiveChat from "./CollectiveChat";

const CollectiveDetail: React.FC<RouteComponentProps> = ({ match }) => {
  const { groupId } = useParams<{ groupId: string }>();
  console.log(groupId, "wats groupID?");

  const { group, loading } = useGetGroupById(groupId);
  console.log(group, "GROUP?");
  const router = useIonRouter();

  //TODO: make the logic for this more bug-proof
  //TODO: make the logic for this more bug-proof
  useEffect(() => {
    if (!loading) {
      if (group?.id && groupId) {
        router.push(routes.mintPage.myCollectives);
      }
    }
  }, [group]);
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        {loading ? (
          <PageLoadingIndicator />
        ) : (
          <IonRouterOutlet className="app-page-router-outlet">
            <Route
              path={routes.collectiveDetail.info}
              component={CollectiveInfo}
              exact
            />
            <Route
              path={routes.collectiveDetail.chat}
              component={CollectiveChat}
              exact
            />
            <Route exact path={routes.collectiveDetail.collectiveDetail}>
              {group ? (
                <Redirect to={routes.collectiveDetail.mints + group.id} />
              ) : null}
            </Route>
          </IonRouterOutlet>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CollectiveDetail;
