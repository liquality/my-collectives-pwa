import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  useIonRouter,
} from "@ionic/react";

import { RouteComponentProps } from "react-router";
import PageSearchBar from "@/components/PageSearchBar";
import RewardsTopBar from "@/components/TopBars/RewardsTopBar";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { shortenAddress } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import GenerateInviteBtn from "@/components/GenerateInvite";
import { pathConstants } from "@/utils/routeNames";
import Header from "@/components/Header";
import useGetRewardsSummary from "@/hooks/useGetRewardsSummary";
import ContractService from "@/services/ContractService";
import { Group } from "@/types/general-types";
import useToast from "@/hooks/useToast";
import { banOutline, flowerOutline } from "ionicons/icons";
import CreatorManagement from "@/components/Rewards/CreatorManagement";
import WithdrawalButton from "@/components/WithdrawalButton";
import { ethers } from "ethers";
import ApiService from "@/services/ApiService";

const Summary: React.FC<RouteComponentProps> = (routerProps) => {
  //TODO: change parent tag to IonPage

  const { myGroups, loading, reload } = useGetMyGroups();
  const { user } = useSignInWallet();
  const { summary, loading: loadingSummary } = useGetRewardsSummary();
  const [loadingWithdrawal, setLoadingWithdrawal] = useState(false);
  const [honeyPotAddresses, setHoneyPotAddresses] = useState<any>({});
  const router = useIonRouter();
  const { presentToast } = useToast();

  const loadingAllData = !myGroups && loading && loadingSummary;

  const getHoneyPotAddressesByGroupId = (groupId: string) => {
    const currentDate = new Date();
    const addresses =
      summary?.user_rewards
        .filter((reward: any) => {
          return (
            reward.groupId === groupId &&
            currentDate < new Date(reward.challengeExpiration)
          );
        })
        .map((reward: any) => reward.challengeHoneyPotAddress) || [];
    return addresses;
  };

  const myCollectives = useMemo(() => {
    if (myGroups && user?.id) {
      return myGroups.filter((group) => group.createdBy === user.id);
    } else return [];
  }, [myGroups, user?.id]);

  const memberOfCollectives = useMemo(() => {
    if (myGroups && user?.id) {
      return myGroups.filter((group) => group.createdBy !== user.id);
    } else return [];
  }, [myGroups, user?.id]);

  useEffect(() => {
    if (myGroups && user?.id && summary) {
      const _honeyPotAddresses = myCollectives
        .map((group) => ({
          groupId: group.id,
          honeyPotAddresses: getHoneyPotAddressesByGroupId(group.id),
        }))
        .reduce((prev: any, curr: any) => {
          prev[curr.groupId] = curr.honeyPotAddresses;
          return prev;
        }, {});
      setHoneyPotAddresses(_honeyPotAddresses);
    }
  }, [myCollectives, summary]);

  const honeyPotHasBalance = (address: string) => {
    return !!summary?.honeypotBalances.find(
      (h: any) =>
        h.address.toLowerCase() === address.toLowerCase() &&
        ethers.BigNumber.from(h.balance).gt(0)
    );
  };

  console.log(
    honeyPotHasBalance("0x9Eb40653adeda1084835741c16b10f6fee305988"),
    "honey pot has balance?"
  );

  const showWithdrawal = (groupId: string) => {
    const currentDate = new Date();
    return !!summary.user_rewards.find((reward: any) => {
      return (
        currentDate < new Date(reward.challengeExpiration) &&
        reward.groupId === groupId &&
        !reward.claimedAt &&
        honeyPotHasBalance(reward.challengeHoneyPotAddress)
      );
    });
  };

  const handleManageNavigation = (groupId: string) => {
    const url = pathConstants.rewards.manage.replace(":groupId", groupId);
    router.push(url, "root");
  };

  const handleWithdrawRewards = async (group: Group) => {
    setLoadingWithdrawal(true);

    console.log("honeyPotAddresses", honeyPotAddresses[group.id]);
    const response = await ContractService.withdrawRewards(
      group.publicAddress || "",
      group.walletAddress || "",
      group.nonceKey,
      honeyPotAddresses[group.id]
    );
    if (response.status === "success") {
      // update inside the database
      await ApiService.saveClaimedRewards(
        group.id,
        honeyPotAddresses[group.id]
      );
      let updateAddresses = { ...honeyPotAddresses };
      delete updateAddresses[group.id];
      setHoneyPotAddresses(updateAddresses);
      setLoadingWithdrawal(false);
      presentToast(
        "You successfully withdrew your rewards!",
        "primary",
        flowerOutline
      );
    } else {
      presentToast(
        "Something went wrong when you tried to withdraw your rewards. Please contact support",
        "danger",
        banOutline
      );
    }
  };

  const handleLeaveGroup = (group: Group) => {
    // TODO: Implement
    try {
      ContractService.leaveCollective(
        group.publicAddress,
        group.walletAddress,
        group.nonceKey
      );
    } catch (error) {
      presentToast(
        "Something went wrong when you tried to leave the collective. Please submit a bug report :)",
        "danger",
        banOutline
      );
    }
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
          <>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonCol size="6">
                  <div className="rewards-summary-item">
                    <div className="rewards-summary-amount">
                      {summary?.invitesCount || 0}
                    </div>
                    <div className="rewards-summary-description">
                      Succesful Invites
                    </div>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="rewards-summary-item">
                    <div className="rewards-summary-amount">
                      {summary?.mintsAmount || 0}
                    </div>
                    <div className="rewards-summary-description">Mints</div>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <div className="rewards-summary-item">
                    <div className="rewards-summary-amount">
                      {summary?.rewardsCount || 0}
                    </div>
                    <div className="rewards-summary-description">Rewards</div>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="rewards-summary-item">
                    <div className="rewards-summary-amount">
                      {summary?.ethEarned || "0.00"}
                    </div>
                    <div className="rewards-summary-description">
                      ETH Earned
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonCol>
                  <div className="rewards-collective-card">
                    <div className="rewards-collective-card-title">
                      My Collectives | {myCollectives?.length}
                    </div>

                    {myCollectives?.map((group, index) => (
                      <div key={index}>
                        <IonRow className="ion-justify-content-between ion-align-items-center">
                          <div className="rewards-collective-card-group-name">
                            {group.name}{" "}
                          </div>
                          <div className="rewards-collective-card-group-actions">
                            {honeyPotAddresses[group.id]
                              ? showWithdrawal(group.id) && (
                                  <WithdrawalButton
                                    group={group}
                                    loadingWithdrawal={loadingWithdrawal}
                                    handleWithdrawRewards={
                                      handleWithdrawRewards
                                    }
                                  />
                                )
                              : null}
                            <GenerateInviteBtn groupId={group.id} /> |{" "}
                            <IonText
                              color="primary"
                              style={{ pointer: "cursor" }}
                              onClick={() => handleManageNavigation(group.id)}
                            >
                              Manage
                            </IonText>
                          </div>
                        </IonRow>

                        <IonRow className="ion-justify-content-between ion-align-items-center">
                          <div className="rewards-collective-card-group-address">
                            {shortenAddress(group.publicAddress || "")}
                          </div>
                          <div>
                            <IonLabel className="rewards-collective-card-group-data">
                              <IonIcon src="/assets/icons/people-tile.svg"></IonIcon>
                              {group.memberCount}
                            </IonLabel>
                            <IonLabel className="rewards-collective-card-group-data">
                              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
                              {group.mintCount}
                            </IonLabel>
                          </div>
                        </IonRow>
                      </div>
                    ))}
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <div className="rewards-collective-card">
                    <div className="rewards-collective-card-title">
                      Member of Collectives | {memberOfCollectives?.length}
                    </div>

                    {memberOfCollectives?.map((group, index) => (
                      <div key={index}>
                        <IonRow className="ion-justify-content-between ion-align-items-center">
                          <div className="rewards-collective-card-group-name">
                            {group.name}{" "}
                          </div>
                          <div className="rewards-collective-card-group-actions">
                            <GenerateInviteBtn groupId={group.id} /> |{" "}
                            <IonText
                              color="primary"
                              style={{ pointer: "cursor" }}
                              onClick={() => handleLeaveGroup(group)}
                            >
                              Leave
                            </IonText>
                          </div>
                        </IonRow>

                        <IonRow className="ion-justify-content-between ion-align-items-center">
                          <div className="rewards-collective-card-group-address">
                            {shortenAddress(group.publicAddress || "")}
                          </div>
                          <div>
                            <IonLabel className="rewards-collective-card-group-data">
                              <IonIcon src="/assets/icons/people-tile.svg"></IonIcon>
                              {group.memberCount}
                            </IonLabel>
                            <IonLabel className="rewards-collective-card-group-data">
                              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
                              {group.mintCount}
                            </IonLabel>
                          </div>
                        </IonRow>
                      </div>
                    ))}
                  </div>
                </IonCol>
              </IonRow>
              {user?.isCreator ? <CreatorManagement /> : null}
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Summary;
