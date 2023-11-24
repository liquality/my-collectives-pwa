import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps, useLocation } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";
import { getLastIndexOfPath } from "@/utils/routeNames";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import useGetPoolsByGroupId from "@/hooks/Collective/useGetPoolsByGroupId";
import PoolsGrid from "@/components/Mint/PoolsGrid";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";

const CollectiveChat: React.FC<RouteComponentProps> = (routerProps) => {
  const location = useLocation();
  const groupId = getLastIndexOfPath(location.pathname);
  const { group } = useGetGroupById(groupId);
  const { pools, loading } = useGetPoolsByGroupId(groupId);
  console.log(pools, "wats pools?");

  return (
    <IonPage>
      <Header title={group?.name} />
      <IonContent className="ion-padding" color="light">
        <CollectiveTopBar {...routerProps}>
          <PageSearchBar />
        </CollectiveTopBar>
        {pools && !loading ? (
          <PoolsGrid pools={pools} />
        ) : (
          <PageLoadingIndicator />
        )}
      </IonContent>
    </IonPage>
  );
};

export default CollectiveChat;
