import Header from "@/components/Header";
import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonGrid,
  IonCol,
  IonProgressBar,
  IonRow,
  useIonRouter,
  IonRouterOutlet,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { Route, RouteComponentProps } from "react-router";
import Challenge from "./Challenge";
import Challenges from "./Challenges";
import Messages from "./Messages";
import MyGroups from "./Mint";
import Info from "./Info";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";

const Mint: React.FC<RouteComponentProps> = ({ match }) => {
  const { groupId } = match.params as any;
  const { group, loading } = useGetGroupById(groupId);
  return (
    <IonPage>
      <Header title={group?.name}>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/mint"></IonBackButton>
        </IonButtons>
      </Header>
      <IonContent className="ion-padding" color="light">
        {loading ? (
          <PageLoadingIndicator />
        ) : (
          <IonTabs>
            <IonRouterOutlet>
              <Route
                path={`/mint/:groupId/challenges`}
                render={() => <Challenges group={group} loading={loading} />}
                exact
              />
              <Route
                path={`/mint/:groupId/challenges/:id`}
                component={Challenge}
              />

              <Route
                path={`/mint/:groupId/chat`}
                render={() => <Messages group={group} loading={loading} />}
                exact
              />

              <Route
                path={`${match.url}/info`}
                render={() => <Info group={group} loading={loading} />}
              />
            </IonRouterOutlet>
            <IonTabBar slot="top">
              <IonTabButton tab="challenges" href={`${match.url}/challenges`}>
                <IonLabel>Challenges</IonLabel>
              </IonTabButton>
              <IonTabButton tab="chat" href={`${match.url}/chat`}>
                <IonLabel>Chat</IonLabel>
              </IonTabButton>
              <IonTabButton tab="info" href={`${match.url}/info`}>
                <IonLabel>Info</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Mint;
