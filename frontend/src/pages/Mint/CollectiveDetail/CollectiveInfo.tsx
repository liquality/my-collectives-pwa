import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps, useLocation } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";
import { getLastIndexOfPath } from "@/utils/routeNames";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";

const CollectiveInfo: React.FC<RouteComponentProps> = (routerProps) => {
  const location = useLocation();
  const groupId = getLastIndexOfPath(location.pathname);
  const { group, loading } = useGetGroupById(groupId);

  return (
    <IonPage>
      <Header title={group?.name} />

      <IonContent className="ion-padding" color="light">
        <CollectiveTopBar {...routerProps}>
          <PageSearchBar />
        </CollectiveTopBar>
        <p>Info about a specific group</p>
      </IonContent>
    </IonPage>
  );
};

export default CollectiveInfo;
