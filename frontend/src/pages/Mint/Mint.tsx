import Header from "@/components/Header";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import CreateGroupModal from "./CreateGroupModal";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { RouteComponentProps } from "react-router";
import { shortenAddress } from "@/utils";
import MintGroupsContent from "./MintGroupsContent";
import NoGroups from "./NoGroups";

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

        <IonButton shape="round" disabled={true} color="medium">
          Create Group
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Mint;
