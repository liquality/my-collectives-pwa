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
  const [updatedSummary, setUpdatedSummary] = useState<any | null>(null);

  const router = useIonRouter();
  const { presentToast } = useToast();

  useEffect(() => {
    if (summary && !updatedSummary) {
      setUpdatedSummary(summary);
    }
  }, [summary, updatedSummary?.user_rewards]);

  const loadingAllData = !myGroups && loading && loadingSummary;

  const getHoneyPotAddressesByGroupId = (groupId: string) => {
    const currentDate = new Date();
    const addresses =
      updatedSummary?.user_rewards
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

  const poolAddressHasBalance = (address: string) => {
    return !!updatedSummary?.poolsAddressBalances.find(
      (h: any) =>
        h.address.toLowerCase() === address.toLowerCase() &&
        ethers.BigNumber.from(h.balance).gt(0)
    );
  };

  const showWithdrawal = (groupId: string) => {
    const currentDate = new Date();

    return !!updatedSummary?.user_rewards.find((reward: any) => {
      return (
        currentDate > new Date(reward.challengeExpiration) &&
        reward.groupId === groupId &&
        !reward.claimedAt &&
        poolAddressHasBalance(reward.poolPublicAddress) &&
        Number(reward.rewardAvailable) > 0
      );
    });
  };

  const handleManageNavigation = (groupId: string) => {
    const url = pathConstants.rewards.manage.replace(":groupId", groupId);
    router.push(url, "root");
  };

  const handleWithdrawRewards = async (group: Group) => {
    setLoadingWithdrawal(true);
    const matchingUserRewards = updatedSummary?.user_rewards.filter(
      (reward: any) => reward.groupId === group.id
    );

    // Extract poolPublicAddresses from the matching user rewards
    const poolPublicAddresses = matchingUserRewards.map(
      (reward: any) => reward.poolPublicAddress
    );

    const response = await ContractService.withdrawRewards(
      group.publicAddress,
      group.walletAddress,
      group.nonceKey,
      poolPublicAddresses
    );
    if (response.status === "success") {
      // update inside the database
      await ApiService.saveClaimedRewards(
        group.id,
        getHoneyPotAddressesByGroupId(group.id)
      );

      // Set the rewardAvailable to 0 after successful withdrawal
      const updatedUserRewards = (updatedSummary?.user_rewards || []).map(
        (reward: any) => {
          if (reward.groupId === group.id) {
            return {
              ...reward,
              rewardAvailable: "0.000000",
            };
          }
          return reward;
        }
      );
      setUpdatedSummary({
        ...updatedSummary,
        user_rewards: updatedUserRewards,
      });
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
                      {updatedSummary?.invitesCount || 0}
                    </div>
                    <div className="rewards-summary-description">
                      Succesful Invites
                    </div>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="rewards-summary-item">
                    <div className="rewards-summary-amount">
                      {updatedSummary?.mintsAmount || 0}
                    </div>
                    <div className="rewards-summary-description">Mints</div>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <div className="rewards-summary-item">
                    <div className="rewards-summary-amount">
                      {updatedSummary?.rewardsCount || 0}
                    </div>
                    <div className="rewards-summary-description">Rewards</div>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="rewards-summary-item">
                    <div className="rewards-summary-amount">
                      {updatedSummary?.ethEarned || "0.00"}
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
                            {showWithdrawal(group.id) ? (
                              <WithdrawalButton
                                group={group}
                                loadingWithdrawal={loadingWithdrawal}
                                handleWithdrawRewards={handleWithdrawRewards}
                              />
                            ) : null}
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
                            {showWithdrawal(group.id) ? (
                              <WithdrawalButton
                                group={group}
                                loadingWithdrawal={loadingWithdrawal}
                                handleWithdrawRewards={handleWithdrawRewards}
                              />
                            ) : null}
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
