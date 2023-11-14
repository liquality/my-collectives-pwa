import Header from "@/components/Header";
import { IonPage } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import CreateGroupModal from "./CreateGroupModal";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { RouteComponentProps } from "react-router";
import { shortenAddress } from "@/utils";
import CustomButton from "@/components/CustomButton";
import MintGroupsContent from "./MintGroupsContent";

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

      {myGroups && myGroups.length > 0 ? (
        <MintGroupsContent
          myGroups={myGroups}
          loadingGroups={loadingGroups}
          reloadGroups={reloadGroups}
          match={match}
        />
      ) : null}
    </IonPage>
  );
};

export default Mint;
