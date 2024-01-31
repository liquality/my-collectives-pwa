import { ethers } from "ethers";
import { dbClient } from "../data";
import { PoolsService } from "./pools";
import { getTopContributorFromEvents } from "../utils/events-query/top-contributor-zora";
import * as MyCollectives from "@liquality/my-collectives-sdk";

export class RewardsService {
  constructor() {
    MyCollectives.setConfig({
      RPC_URL: process.env.RPC_URL || "",
      PIMLICO_API_KEY: process.env.PIMLICO_API_KEY,
      BICONOMY_PAYMASTER: process.env.BICONOMY_PAYMASTER,
      BICONOMY_BUNDLER_API_KEY: process.env.BICONOMY_BUNDLER_API_KEY,
      AA_PROVIDER: MyCollectives.AAProviders.PIMLICO,
    });
  }

  async getPoolParticipation(memberAddress: string, poolsAddress: string) {
    const participationResponse = await MyCollectives.Pool.getParticipation(
      poolsAddress,
      memberAddress
    );
    console.log(participationResponse, 'participation resposne')

    if (
      participationResponse?.participant.toLowerCase() ===
      memberAddress.toLowerCase()
    ) {
      const participation = {
        address: participationResponse.participant,
        contribution: participationResponse.contribution?.toString(),
        rewardAmount: ethers.utils.formatEther(participationResponse.reward),
        rewardAvailable: ethers.utils.formatEther(
          participationResponse.rewardAvailable
        ),
      };
      return participation;
    }

    return null;
  }

  async getTotalContributions(poolsAddress: string) {
    const totalContributions = await MyCollectives.Pool.getTotalContributions(
      poolsAddress
    );

    return totalContributions;
  }

  async getRewards(poolsAddress: string) {
    const rewards = await MyCollectives.Pool.getPoolReward(poolsAddress);
    return rewards;
  }

  async syncPoolsData(userId: string) {
    const user = await dbClient("users")
      .where("id", "=", userId)
      .first("id", "publicAddress");

    const pools = await dbClient
      .select(
        "pools.id as poolId",
        "pools.groupId",
        "pools.publicAddress",
        "pools.challengeId",
        "pools.createdBy",
        "challenges.createdAt",
        "challenges.id as challengeId",
        "challenges.chainId",
        "challenges.mintingContractAddress",
        "challenges.network",
        "challenges.totalMints"
      )
      .from("pools")
      .join("challenges", "pools.challengeId", "=", "challenges.id");
    //.where(dbClient.raw("challenges.expiration > ?", [dbClient.fn.now()]));

    const userRewards: any[] = [];
    for (const pool of pools) {
      const poolParticipation = await this.getPoolParticipation(
        user.publicAddress,
        pool.publicAddress
      );

      console.log(poolParticipation, 'wats pool participation?')

      if (poolParticipation) {
        userRewards.push({
          numberOfMints: poolParticipation.contribution,
          amountInEthEarned: poolParticipation.rewardAmount,
          rewardAvailable: poolParticipation.rewardAvailable,
          userId: user.id,
          poolId: pool.poolId,
          groupId: pool.groupId,
        });
      }
    }

    try {

      if (userRewards.length) {
        await dbClient.transaction(async (trx) => {
          // Upsert new data
          const result = await trx("user_rewards")
            .insert(userRewards)
            .onConflict(["userId", "poolId", "groupId"])
            .merge();

          return { success: true };
        });
      }
      else return { success: true };


    } catch (error) {
      console.error("user_rewards error:", error);
      return { success: false };
    }

    try {
      const topContripResult = await RewardsService.setTopContributorGroup();
      console.debug("setTopContributorGroup:", topContripResult);
    } catch (error) {
      console.log(error, "setTopContributorGroup error");
      return { success: false };
    }
  }

  public static async setTopContributorGroup(): Promise<any> {
    let mnemonic = process.env.AUTHORIZED_OPERATOR_PHRASE || "YOUR MNEMONIC";
    let privateKey = ethers.Wallet.fromMnemonic(mnemonic).privateKey;
    try {
      //1)Get all pools  that are expired
      const expiredPools = await PoolsService.findAllPoolsThatAreExpired();
      console.log("How many expired pools ? >>>>", expiredPools.length);
      if (!expiredPools.length) return null;
      else {
        for (const pool of expiredPools) {
          //2) Check if topContributor has already been set
          const topContributor = await MyCollectives.HoneyPot.getTopContributor(
            pool.honeyPotAddress
          );
          console.log(
            "Topcontributor ? >>>>",
            topContributor,
            "HoneyPot address >>>> ",
            pool.honeyPotAddress
          );
          // 3) If the top contributor is set, do nothing
          if (topContributor === ethers.constants.AddressZero) {
            //6) Scrape events from ethers, create a leaderboard and return top contributor
            const topContributorAddress = await getTopContributorFromEvents(
              pool.createdAt,
              pool.expiration,
              pool.mintingContractAddress,
              pool.network
            );
            if (topContributorAddress?.address) {
              const honeyPotHasBalance =
                await RewardsService.getHoneyPotContractBalance(
                  pool.honeyPotAddress
                );
              console.log(honeyPotHasBalance, "honey pot balance");

              if (Number(honeyPotHasBalance?.balanceInEth || 0) > 0) {
                const setTopContributorResponse =
                  await MyCollectives.HoneyPot.setTopContributor(
                    privateKey,
                    pool.honeyPotAddress,
                    topContributorAddress.address
                  );
                console.log(
                  setTopContributorResponse,
                  "wat is response TOP CONTRIBUTOR"
                );
                if (setTopContributorResponse.txHash) {
                  console.log(
                    privateKey,
                    "honeypot:",
                    pool.honeyPotAddress,
                    "publicaddress:",
                    pool.publicAddress
                  );
                  //The honeypot smart contract holds the zora rewards from minting,
                  //first check if it has balance, then send them from the honeypot
                  const sendRewardsResponse =
                    await MyCollectives.HoneyPot.sendReward(
                      privateKey,
                      pool.honeyPotAddress
                    );
                  console.log(sendRewardsResponse, "send rewards response");
                  //Send the reward to the poolAddress
                  const distributeRewardsResponse =
                    await MyCollectives.Pool.distributeRewards(
                      privateKey,
                      pool.publicAddress
                    );
                  console.log(
                    distributeRewardsResponse,
                    "distribute rewards response"
                  );
                } else return null;
              }
            } else return null;
          } else {
            return null;
          }
        }
      }
    } catch (error) {
      console.log(error, "error in top contributor");
    }
  }

  public static async getHoneyPotContractBalance(
    honeyPotAddress: string
  ): Promise<any> {
    //TODO make it multichain
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const balanceInWei = await provider.getBalance(honeyPotAddress);
    const balanceInEth = ethers.utils.formatEther(balanceInWei);
    return {
      balanceInWei,
      balanceInEth,
    };
  }

  public static async getPoolAddressBalance(
    poolAddress: string
  ): Promise<any> {
    //TODO make it multichain
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const balanceInWei = await provider.getBalance(poolAddress);
    const balanceInEth = ethers.utils.formatEther(balanceInWei);
    console.log(balanceInEth, "balance in eth inside pool balance");
    return {
      balanceInWei,
      balanceInEth,
    };
  }

  public static async saveClaimedRewards(
    userId: string,
    groupId: string,
    honeyPotAddresses: string[]
  ): Promise<void> {
    try {
      const poolsData = await dbClient
        .select("pools.id as poolId", "pools.groupId", "pools.challengeId")
        .from("pools")
        .whereIn("challenges.honeyPotAddress", honeyPotAddresses)
        .where("pools.groupId", "=", groupId)
        .join("challenges", "pools.challengeId", "=", "challenges.id")
        .join("groups", "pools.groupId", "=", "groups.id");
      const poolIds = poolsData.map((p) => p.poolId);
      console.log({ poolIds, userId, groupId });
      await dbClient("user_rewards")
        .where("userId", "=", userId)
        .andWhere("groupId", "=", groupId)
        .whereIn("poolId", poolIds)
        .update("claimedAt", dbClient.fn.now());
    } catch (error) {
      console.error(error);
    }
  }
}
