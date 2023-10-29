import GroupRows from "@/pages/Mint/GroupRows";
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
} from "@ionic/react";
import { add, peopleOutline, layersOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import CreateGroupModal from "./CreateGroupModal";

const Mint: React.FC = () => {
  const page = useRef(undefined);
  const createGroupModal = useRef<HTMLIonModalElement>(null);
  const createPoolModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);
  const { myGroups, loading: loadingGroups, reload: reloadGroups } = useGetMyGroups();
  const router = useIonRouter();
  
  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function hideCreateGroupModal() {
    createGroupModal.current?.dismiss();
  }
  function hideCreatePoolModal() {
    createPoolModal.current?.dismiss();
  }
  function handleCreateGroup(groupId: number) {
    hideCreateGroupModal();
    reloadGroups();
    // router.push(`messages/${groupId}`);
  }

  return (
    <IonPage ref={page}>
      <Header title="Mint" />
      <IonContent className="ion-padding" color="light">
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton id="open-create-group-modal" color="tertiary">
              <IonIcon icon={peopleOutline}></IonIcon>
            </IonFabButton>
            <IonFabButton color="secondary" id="open-create-pool-modal">
              <IonIcon icon={layersOutline}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
        {
          loadingGroups ?  (
            <IonGrid>
              <IonRow
              className="ion-justify-content-center ion-align-items-center"
              style={{ minHeight: "80vh" }}
            >
              <IonCol>
                <IonProgressBar type="indeterminate"></IonProgressBar>
              </IonCol>
            </IonRow>
            </IonGrid>
          ) : <GroupRows groups={myGroups} loading={loadingGroups} />
        }
        <CreateGroupModal
          trigger="open-create-group-modal"
          ref={createGroupModal}
          presentingElement={presentingElement}
          dismiss={hideCreateGroupModal}
          onSuccess={handleCreateGroup}
        />
      </IonContent>
    </IonPage>
  );
};

export default Mint;
