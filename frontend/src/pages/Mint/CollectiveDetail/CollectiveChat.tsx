import { IonContent, IonPage } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";
import Chat from "@/components/Chat";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";

const CollectiveChat: React.FC<RouteComponentProps> = (routerProps) => {
  console.log(routerProps, "routerProps");
  const { group, loading } = useGetGroupById(
    "06623418-fc81-4cf0-8a1c-7e9ca41b64b6"
  );
  return (
    <IonPage>
      <Header title="Collective Name" />
      <IonContent className="ion-padding" color="light">
        <CollectiveTopBar {...routerProps}>
          <PageSearchBar />
        </CollectiveTopBar>
        {group && !loading ? <Chat group={group} /> : null}

        <p>Chaaaat component goes here</p>
      </IonContent>
    </IonPage>
  );
};

export default CollectiveChat;
