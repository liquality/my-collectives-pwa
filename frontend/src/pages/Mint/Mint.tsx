import Header from "@/components/Header";
import {
  IonContent,
  IonPage,
  IonRouterOutlet,
  useIonRouter,
} from "@ionic/react";
import { useEffect } from "react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";

import { Route, RouteComponentProps } from "react-router";
import MintGroupsContent from "./MintGroupsContent";
import NoGroups from "./NoGroups";
import CreateCollective from "./CreateCollective";
import Messages from "./Messages";
import ManageCollective from "./ManageCollective";

const Mint: React.FC<RouteComponentProps> = ({ match }) => {
  const { myGroups, loading, reload } = useGetMyGroups();

  const router = useIonRouter();
  console.log(myGroups, "myg grouups");

  useEffect(() => {
    if (myGroups && myGroups.length > 0) {
      router.push("/mint/collectiveContent");
    } else {
      router.push("/mint/collectiveContent");
    }
  }, []);

  return (
    <IonPage>
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
          <Route
            path={`/mint/collectiveContent`}
            component={MintGroupsContent}
            exact
          />
          <Route path={`/mint/noCollectives`} component={NoGroups} exact />
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default Mint;
