import Header from "@/components/Header";
import { IonButton, IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import CreateGroupModal from "./CreateGroupModal";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { shortenAddress } from "@/utils";
import MintGroupsContent from "./MintGroupsContent";
import NoGroups from "./NoGroups";
import CreateCollective from "./CreateCollective";
import Messages from "./Messages";
import ManageCollective from "./ManageCollective";

const Mint: React.FC<RouteComponentProps> = ({ match }) => {
  const page = useRef(undefined);

  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  const {
    myGroups,
    loading: loadingGroups,
    reload: reloadGroups,
  } = useGetMyGroups();
  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  console.log(myGroups, "myg grouups");

  return (
    <IonPage ref={page}>
      <Header title="Mint" />
      <IonContent className="ion-padding" color="light">
        <IonRouterOutlet className="app-page-router-outlet">
          <Route
            path={`/mint/createCollective`}
            component={CreateCollective}
            exact
          />
          <Route
            path={`/mint/manageCollective`}
            component={ManageCollective}
            exact
          />

          <Route exact path="/discover">
            <Redirect to="/discover/new" />
          </Route>
        </IonRouterOutlet>
        {myGroups && myGroups.length > 0 ? (
          <MintGroupsContent
            myGroups={myGroups}
            loadingGroups={loadingGroups}
            reloadGroups={reloadGroups}
            match={match}
          />
        ) : (
          <NoGroups />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Mint;
