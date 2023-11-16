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
import MintTopBar from "@/components/Mint/MintTopBar";
import { routes } from "@/utils/routeNames";
import { useEffect } from "react";

const MintGroupsContent: React.FC<RouteComponentProps> = ({ match }) => {
  const { myGroups, loading, setMyGroups } = useGetMyGroups();
  const router = useIonRouter();
  const queryParams = new URLSearchParams(location.search);
  const groupName = queryParams.get("groupName");
  const groupAddress = queryParams.get("groupAddress");
  const groupId = queryParams.get("groupId");
  const createdBy = queryParams.get("createdBy");

  const handleNavigateToCreateCollective = () => {
    router.push(routes.mintPage.createCollective);
  };

  //If a new group has been created, push into exisitng groups array state to avoid re-fetching of groups
  useEffect(() => {
    if (groupName && groupAddress && groupId && createdBy) {
      const newGroup = {
        name: groupName,
        publicAddress: groupAddress,
        id: groupId,
        createdBy: createdBy,
      };
      setMyGroups((prevGroups) => [...(prevGroups || []), newGroup]);
    }
  }, [groupName, groupAddress, groupId, createdBy]);

  return (
    <IonPage>
      <Header title="Mint" />

      <IonContent className="ion-padding">
        <MintTopBar />
        {loading ? (
          <PageLoadingIndicator />
        ) : (
          <IonList inset={true}>
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
