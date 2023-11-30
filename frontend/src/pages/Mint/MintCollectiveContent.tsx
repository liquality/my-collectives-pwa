import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import {
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  useIonRouter,
  IonContent,
} from "@ionic/react";
import { shortenAddress } from "@/utils";
import { RouteComponentProps } from "react-router";
import Header from "@/components/Header";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import MintTopBar from "@/components/TopBars/MintTopBar";
import { pathConstants } from "@/utils/routeNames";
import { useEffect } from "react";
import CollectiveList from "@/components/Mint/FullListOfCollectives";
import PageSearchBar from "@/components/PageSearchBar";
import NoGroups from "./NoGroups";

const MintCollectiveContent: React.FC<RouteComponentProps> = (routerProps) => {
  const { myGroups, loading, setMyGroups } = useGetMyGroups();
  const router = useIonRouter();
  const queryParams = new URLSearchParams(location.search);
  const groupName = queryParams.get("groupName");
  const groupAddress = queryParams.get("groupAddress");
  const groupId = queryParams.get("groupId");
  const createdBy = queryParams.get("createdBy");
  const isNewlyCreatedGroup = groupName && groupAddress && groupId && createdBy;

  const handleNavigateToCreateCollective = () => {
    router.push(pathConstants.mintPage.createCollective);
  };

  //If a new group has been created, push into exisitng groups array state to avoid re-fetching of groups
  useEffect(() => {
    if (isNewlyCreatedGroup) {
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
      {!myGroups || !myGroups.length ? (
        <NoGroups />
      ) : (
        <IonContent className="ion-padding">
          <MintTopBar {...routerProps}>
            <PageSearchBar />
          </MintTopBar>
          <div className="space-between">
            <p className="collective-card-titles">NAME</p>
            <p className="collective-card-titles">ACTIVE</p>
          </div>
          {loading ? (
            <PageLoadingIndicator />
          ) : (
            <CollectiveList myGroups={myGroups} />
          )}

          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton
              id="open-create-group-modal"
              className="create-fab-button"
              onClick={handleNavigateToCreateCollective}
            >
              <IonIcon src="/assets/icons/add.svg"></IonIcon>
              <IonLabel>Create Collective</IonLabel>
            </IonFabButton>
          </IonFab>
        </IonContent>
      )}
    </IonPage>
  );
};

export default MintCollectiveContent;
