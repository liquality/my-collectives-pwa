import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps, useLocation } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";
import Chat from "@/components/Chat";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import { getLastIndexOfPath } from "@/utils/routeNames";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";

export interface CollectiveChatProps
  extends RouteComponentProps<{
    groupId: string;
  }> {}

const CollectiveChat: React.FC<CollectiveChatProps> = ({ match }) => {
  const { groupId } = match.params;
  const { group, loading } = useGetGroupById(groupId);

  return (
    <IonPage>
      <Header title={group?.name} />
      <IonContent className="ion-padding" color="light">
        <CollectiveTopBar>
          <PageSearchBar />
        </CollectiveTopBar>
        {group && !loading ? <Chat group={group} /> : <PageLoadingIndicator />}
      </IonContent>
    </IonPage>
  );
};

export default CollectiveChat;
