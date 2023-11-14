import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
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
  IonButton,
} from "@ionic/react";

import CreateGroupModal from "./CreateGroupModal";
import { shortenAddress } from "@/utils";
import { useRef } from "react";
import { Group } from "@/types/chat";
import { RouteComponentProps } from "react-router";
export interface MintGroupsContentProps {
  myGroups: Group[];
  loadingGroups: boolean;
  reloadGroups: () => void;
  match: any;
}

const MintGroupsContent = ({
  myGroups,
  reloadGroups,
  loadingGroups,
  match,
}: MintGroupsContentProps) => {
  const createGroupModal = useRef<HTMLIonModalElement>(null);
  const createPoolModal = useRef<HTMLIonModalElement>(null);

  function handleCreateGroup(groupId: number) {
    reloadGroups();
    // router.push(`messages/${groupId}`);
  }
  return (
    <IonItem>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton
          id="open-create-group-modal"
          className="create-fab-button"
        >
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
            ? myGroups.map((group: any, index: number) => (
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
      {/*       <CreateGroupModal
          trigger="open-create-group-modal"
          ref={createGroupModal}
          presentingElement={presentingElement}
          dismiss={hideCreateGroupModal}
          onSuccess={handleCreateGroup}
        /> */}
    </IonItem>
  );
};

export default MintGroupsContent;
