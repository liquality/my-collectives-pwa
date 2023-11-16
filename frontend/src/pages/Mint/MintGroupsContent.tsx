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
  useIonRouter,
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
  const router = useIonRouter();

  const handleNavigateToCreateCollective = () => {
    router.push("/mint/createCollective");
  };

  return (
    <IonContent>
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

      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton
          id="open-create-group-modal"
          className="create-fab-button"
          onClick={handleNavigateToCreateCollective}
        >
          <IonIcon src="/assets/icons/pencil.svg"></IonIcon>
          <IonLabel>Create Group</IonLabel>
        </IonFabButton>
      </IonFab>
    </IonContent>
  );
};

export default MintGroupsContent;
