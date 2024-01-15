import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  useIonRouter,
} from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";
import { pathConstants } from "@/utils/routeNames";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import { shortenAddress } from "@/utils";
import MembersTable from "@/components/Mint/MembersTable";
import GenerateInviteBtn from "@/components/GenerateInvite";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import ContractService from "@/services/ContractService";
import useGetChallengesByGroupId from "@/hooks/Collective/useGetChallengesByGroupId";
import { useState } from "react";

export interface CollectiveInfoProps
  extends RouteComponentProps<{
    groupId: string;
  }> {}

const CollectiveInfo: React.FC<CollectiveInfoProps> = ({ match }) => {
  const { groupId } = match.params;
  const { group, members, loading } = useGetGroupById(groupId);
  const { pools, loading: challengesLoading } =
    useGetChallengesByGroupId(groupId);
  const router = useIonRouter();
  const [loadingWithdrawal, setLoadingWithdrawal] = useState(false);

  const handleManageNavigation = () => {
    const url = pathConstants.rewards.manage.replace(":groupId", groupId);
    router.push(url, "root");
  };

  console.log(loadingWithdrawal);
  console.log(group, "groups?");
  const handleWithDrawal = async () => {
    if (pools && group) {
      setLoadingWithdrawal(true);

      const honeyAddresses = pools.map((item: any) => item.honeyPotAddress);
      const response = await ContractService.withdrawRewards(
        group.publicAddress,
        group.walletAddress,
        group.nonceKey,
        honeyAddresses
      );
      if (response) {
        setLoadingWithdrawal(false);
      }
    }
  };

  return (
    <IonPage>
      <Header title={group?.name} />

      {group && members && !loading ? (
        <IonContent className="ion-padding" color="light">
          <CollectiveTopBar>
            <PageSearchBar />
          </CollectiveTopBar>
          <IonCard className="info-card-container first-card">
            <IonCardTitle>{group?.name}</IonCardTitle>
            <IonCardContent>
              <IonCardSubtitle>
                {shortenAddress(group?.publicAddress || "")}
              </IonCardSubtitle>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon
                    style={{ fontSize: "0.9rem" }}
                    src="/assets/icons/mint-tile.svg"
                  ></IonIcon>
                  <IonLabel>{group?.poolsCount || 0}</IonLabel>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon
                    style={{ fontSize: "1rem" }}
                    src="/assets/icons/people-tile.svg"
                  ></IonIcon>
                  <IonLabel>{group?.memberCount || 0}</IonLabel>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon
                    style={{ fontSize: "0.7rem", marginTop: 1 }}
                    src="/assets/icons/message-tile.svg"
                  ></IonIcon>
                  <IonLabel>{group?.messagesCount || 0}</IonLabel>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
          <IonCard className="info-card-container second-card">
            <IonRow className="ion-justify-content-between ion-align-items-center">
              <IonCardTitle>Members | {members?.length || 0} </IonCardTitle>
              <IonText style={{ fontSize: "13px" }}>See All</IonText>
            </IonRow>
            <MembersTable group={group} members={members} />
          </IonCard>
          <IonCard className="info-card-container third-card">
            <IonCardTitle>Collective Rewards | 6 </IonCardTitle>
          </IonCard>

          <IonRow className="manage-group-row ion-padding ion-justify-content-between ion-align-items-center">
            <IonText>
              {group.loggedInUserIsAdmin ? (
                <>
                  <IonText
                    color="primary"
                    style={{ pointer: "cursor" }}
                    onClick={handleManageNavigation}
                  >
                    Manage{" "}
                  </IonText>{" "}
                  |{" "}
                </>
              ) : null}
              <IonText
                color="primary"
                style={{ pointer: "cursor" }}
                onClick={handleWithDrawal}
              >
                {loadingWithdrawal ? (
                  <IonSpinner
                    style={{
                      width: 13,
                      height: 13,
                    }}
                    color="primary"
                    name="circular"
                  ></IonSpinner>
                ) : (
                  "Withdraw"
                )}{" "}
              </IonText>{" "}
              {group.loggedInUserIsAdmin ? (
                <IonText style={{ color: "grey" }}>| </IonText>
              ) : null}
              <GenerateInviteBtn groupId={group.id} />
            </IonText>
            <IonText>Leave Collective</IonText>
          </IonRow>
        </IonContent>
      ) : (
        <PageLoadingIndicator />
      )}
    </IonPage>
  );
};

export default CollectiveInfo;
