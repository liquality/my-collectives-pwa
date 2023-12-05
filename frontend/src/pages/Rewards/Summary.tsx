import {
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";

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
import { pathConstants } from "@/utils/routeNames";
import Header from "@/components/Header";

const Summary: React.FC<RouteComponentProps> = (routerProps) => {
  //TODO: change parent tag to IonPage

  const { myGroups, loading, reload } = useGetMyGroups();
  const { user } = useSignInWallet();
  const router = useIonRouter();
  console.log(myGroups, "My groups");

  const loadingAllData = !myGroups && loading;

  const filterForUserCreatedGroups = useMemo(() => {
    if (myGroups && user?.id) {
      return myGroups.filter((group) => group.createdBy === user.id);
    } else return [];
  }, [myGroups, user?.id]);

  console.log(filterForUserCreatedGroups, "filtered groups");

  const handleManageNavigation = (groupId: string) => {
    const url = pathConstants.rewards.manage.replace(":groupId", groupId);
    router.push(url, "root");
  };

  return (
    <IonPage>
      <Header title="Rewards" />

      <IonContent className="ion-padding" color="light">
        <RewardsTopBar {...routerProps}>
          <PageSearchBar searchEnabled={false} reloadEnabled={false} />
        </RewardsTopBar>
        {loadingAllData ? (
          <PageLoadingIndicator />
        ) : (
          <div className="rewards-summary-page ">
            <h4></h4>
            <ul className="bullet-points">
              <li>No styling yet as figma design is still WIP</li>
              <li>Below is just the data we need:</li>
            </ul>
            <div className="pink-line mb-1"></div>
            <IonCard className="info-card-container second-card ">
              <IonCardTitle>
                {" "}
                My Created Collectives: {myGroups?.length}
              </IonCardTitle>

              {filterForUserCreatedGroups?.map((group, index) => (
                <div key={index}>
                  <IonRow className="ion-justify-content-between ion-align-items-center">
                    <IonCardTitle>{group.name} </IonCardTitle>
                    <IonText style={{ fontSize: "13px" }}>
                      {" "}
                      <GenerateInviteBtn groupId={group.id} /> |{" "}
                      <IonText onClick={() => handleManageNavigation(group.id)}>
                        Manage{" "}
                      </IonText>
                    </IonText>
                  </IonRow>

                  <IonRow className="ion-justify-content-between ion-align-items-center">
                    <IonLabel>
                      {" "}
                      {shortenAddress(group.publicAddress || "")}
                    </IonLabel>
                    <IonLabel>
                      {" "}
                      Members: {group.memberCount} Mints: {group.mintCount}
                    </IonLabel>
                  </IonRow>
                </div>
              ))}
            </IonCard>

            <IonCard className="info-card-container second-card ">
              <IonCardTitle>
                {" "}
                My Created Collectives: {myGroups?.length}
              </IonCardTitle>
              Member of Collectives: {myGroups?.length}
              {filterForUserCreatedGroups?.map((group, index) => (
                <div key={index}>
                  <IonRow className="ion-justify-content-between ion-align-items-center">
                    <IonCardTitle>{group.name} </IonCardTitle>
                    <IonText style={{ fontSize: "13px" }}>
                      {" "}
                      <GenerateInviteBtn groupId={group.id} /> | Leave
                    </IonText>
                  </IonRow>

                  <IonRow className="ion-justify-content-between ion-align-items-center">
                    <IonLabel>
                      {" "}
                      {shortenAddress(group.publicAddress || "")}
                    </IonLabel>
                    <IonLabel>
                      {" "}
                      Members: {group.memberCount} Mints: {group.mintCount}
                    </IonLabel>
                  </IonRow>
                </div>
              ))}
            </IonCard>
          </div>
        )}

        <div className="pink-line mb-1"></div>
      </IonContent>
    </IonPage>
  );
};

export default Summary;
