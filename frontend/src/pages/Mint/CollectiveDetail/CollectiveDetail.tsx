import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { Route, RouteComponentProps, useParams } from "react-router";
import { pathConstants } from "@/utils/routeNames";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import CollectiveInfo from "./CollectiveInfo";
import CollectiveChat from "./CollectiveChat";
import CollectiveMint from "./CollectiveMint";

const CollectiveDetail: React.FC<RouteComponentProps> = ({ match }) => {
  const { groupId } = useParams<{ groupId: string }>();

  const { group, loading } = useGetGroupById(groupId);

  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        {loading ? (
          <PageLoadingIndicator />
        ) : (
          <IonRouterOutlet className="app-page-router-outlet">
            <Route
              path={pathConstants.collectiveDetail.info}
              component={CollectiveInfo}
            />
            <Route
              path={pathConstants.collectiveDetail.chat}
              component={CollectiveChat}
            />
            <Route
              path={pathConstants.collectiveDetail.mints}
              component={CollectiveMint}
            />
          </IonRouterOutlet>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CollectiveDetail;
