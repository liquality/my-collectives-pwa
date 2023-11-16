import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import {
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  useIonRouter,
  IonContent,
} from "@ionic/react";
import { shortenAddress } from "@/utils";

import { RouteComponentProps } from "react-router";
import Header from "@/components/Header";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";

const MintGroupsContent: React.FC<RouteComponentProps> = ({ match }) => {
  const { myGroups, loading } = useGetMyGroups();
  const router = useIonRouter();

  const handleNavigateToCreateCollective = () => {
    router.push("/mint/createCollective");
  };

  return (
    <IonPage>
      <Header title="Mint" />
      <IonContent>
        {loading ? (
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
    </IonPage>
  );
};

export default MintGroupsContent;
