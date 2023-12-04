import { IonButton, IonContent, IonPage } from "@ionic/react";

import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { RouteComponentProps } from "react-router";
import PageSearchBar from "@/components/PageSearchBar";
import RewardsTopBar from "@/components/TopBars/RewardsTopBar";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { shortenAddress } from "@/utils";
import { useMemo } from "react";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import GenerateInviteBtn from "@/components/GenerateInvite";

const Summary: React.FC<RouteComponentProps> = (routerProps) => {
  //TODO: change parent tag to IonPage

  const { myGroups, loading, reload } = useGetMyGroups();
  const { user } = useSignInWallet();
  console.log(myGroups, "My groups");

  const loadingAllData = !myGroups && loading;

  const filterForUserCreatedGroups = useMemo(() => {
    if (myGroups && user?.id) {
      return myGroups.filter((group) => group.createdBy === user.id);
    } else return [];
  }, [myGroups, user?.id]);

  console.log(filterForUserCreatedGroups, "filtered groups");

  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <RewardsTopBar {...routerProps}>
          <PageSearchBar searchEnabled={false} reloadEnabled={false} />
        </RewardsTopBar>
        {loadingAllData ? (
          <PageLoadingIndicator />
        ) : (
          <div className="flexDirectionCol mb-1">
            <h4></h4>
            <ul className="bullet-points">
              <li>No styling yet as figma design is still WIP</li>
              <li>Below is just the data we need:</li>
            </ul>
            <div className="pink-line mb-1"></div>
            My Created Collectives: {myGroups?.length}
            {filterForUserCreatedGroups?.map((group, index) => (
              <div className="flexDirectionRow" key={index}>
                <p>{group.name} </p>{" "}
                <p>Address: {shortenAddress(group.publicAddress || "")}</p>
                <p>Members: {group.memberCount}</p>
                <p>Mints: {group.mintCount}</p>
                <GenerateInviteBtn groupId={group.id} />
              </div>
            ))}
            <div className="pink-line mb-1"></div>
            Member of Collectives: {myGroups?.length}
            {filterForUserCreatedGroups?.map((group, index) => (
              <div className="flexDirectionRow" key={index}>
                <p>{group.name} </p>{" "}
                <p>Address: {shortenAddress(group.publicAddress || "")}</p>
                <p>Members: {group.memberCount}</p>
                <p>Mints: {group.mintCount}</p>
              </div>
            ))}
          </div>
        )}

        <div className="pink-line mb-1"></div>
      </IonContent>
    </IonPage>
  );
};

export default Summary;
