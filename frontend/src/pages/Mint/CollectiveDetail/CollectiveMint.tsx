import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import useGetPoolsByGroupId from "@/hooks/Collective/useGetPoolsByGroupId";
import PoolsGrid from "@/components/Mint/PoolsGrid";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";

export interface CollectiveMintProps
  extends RouteComponentProps<{
    groupId: string;
  }> {}

const CollectiveChat: React.FC<CollectiveMintProps> = ({ match }) => {
  const { groupId } = match.params;
  const { group } = useGetGroupById(groupId);
  const { pools, loading } = useGetPoolsByGroupId(groupId);

  return (
    <IonPage>
      <Header title={group?.name} />
      <IonContent className="ion-padding" color="light">
        <CollectiveTopBar>
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
