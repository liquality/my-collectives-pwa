import Header from "@/components/Header";
import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
} from "@ionic/react";
import { add, peopleOutline, layersOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import CreateGroupModal from "./CreateGroupModal";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { RouteComponentProps } from "react-router";
import { shortenAddress } from "@/utils";

const Mint: React.FC<RouteComponentProps> = ({ match }) => {
  const page = useRef(undefined);
  const createGroupModal = useRef<HTMLIonModalElement>(null);
  const createPoolModal = useRef<HTMLIonModalElement>(null);
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
        <IonFabButton id="open-create-group-modal" className="create-fab-button">
              <IonIcon src="/assets/icons/pencil.svg"></IonIcon>
              <IonLabel>Create Group</IonLabel>
            </IonFabButton>
        </IonFab>
        {loadingGroups ? (
          <PageLoadingIndicator />
        ) : (
          <IonList inset={true}>
            <IonListHeader>
              <IonLabel>My Groups</IonLabel>
            </IonListHeader>
            {myGroups
              ? myGroups.map((group, index) => (
                  <IonItem
                    button
                    href={`${match.url}/${group.id}/challenges`}
                    key={index}
                    detail={true}
                  >
                    <IonAvatar aria-hidden="true" slot="start">
                      <img
                        alt=""
                        src="https://ionicframework.com/docs/img/demos/avatar.svg"
                      />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        {group.name}
                        {group.id}
                      </h3>
                      <p>Members: {group.members}</p>
                    </IonLabel>
                    <IonNote color="medium" slot="end">
                      {shortenAddress(group.publicAddress)}
                    </IonNote>
                  </IonItem>
                ))
              : null}
          </IonList>
        )}
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
