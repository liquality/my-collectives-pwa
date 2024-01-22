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
    console.log(poolsAddress, "poolsaddress?", memberAddress);
    const participationResponse = await MyCollectives.Pool.getParticipation(
      poolsAddress,
      memberAddress
    );

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
      console.log(participation, "participation response");
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
      .join("challenges", "pools.challengeId", "=", "challenges.id")
      .where(dbClient.raw("challenges.expiration > ?", [dbClient.fn.now()]));

    const userRewards: any[] = [];
    for (const pool of pools) {
      const poolParticipation = await this.getPoolParticipation(
        user.publicAddress,
        pool.publicAddress
      );

      console.log(poolParticipation, 'pool participation')
      if (poolParticipation) {
        userRewards.push({
          numberOfMints: poolParticipation.contribution,
          amountInEthEarned: pool.rewardAmount,
          userId: user.id,
          poolId: pool.poolId,
          groupId: pool.groupId,
        });
      }


      console.log(userRewards, 'userrewards array')
    }

    try {
      await dbClient.transaction(async (trx) => {
        // remove existing data
        await trx("user_rewards")
          .whereIn('userId', userRewards.map(i => i.userId))
          .whereIn('poolId', userRewards.map(i => i.poolId))
          .whereIn('groupId', userRewards.map(i => i.groupId))
          .del();
        //insert new data
        const result = await trx("user_rewards").insert(userRewards);
        console.debug("user_rewards result:", result);
        return { success: true };
      });
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
    console.log(privateKey, "privateKey");
    try {
      //1)Get all pools  that are expired
      const expiredPools = await PoolsService.findAllPoolsThatAreExpired();
      console.log(expiredPools, "expired pools", expiredPools.length);

      for (const pool of expiredPools) {
        //2) Check if topContributor has already been set 
        const topContributor = await MyCollectives.HoneyPot.getTopContributor(pool.honeyPotAddress)
        console.log(topContributor, 'HAS TOP CONTRIBUTOR BEEN SET?', pool.honeyPotAddress)
        // 3) If the top contributor is set, do nothing
        if (topContributor !== ethers.constants.AddressZero) {
          return null
        } else {
          //6) Scrape events from ethers, create a leaderboard and return top contributor
          const topContributorAddress = await getTopContributorFromEvents(pool.createdAt, pool.expiration, pool.mintingContractAddress, pool.network)
          if (topContributorAddress?.address) {
            const setTopContributorResponse = await MyCollectives.HoneyPot.setTopContributor(privateKey, pool.honeyPotAddress, topContributorAddress.address)
            console.log(setTopContributorResponse, 'wat is response TOP CONTRIBUTOR')
            if (setTopContributorResponse.txHash) {
              //TODO: find collective by topcontributor.address, if it exists, send the reward
              console.log(privateKey, 'honeypot:', pool.honeyPotAddress, 'publicaddress:', pool.publicAddress,)
              //The honeypot smart contract holds the zora rewards from minting, send them from the honeypot
              const sendRewardsResponse = await MyCollectives.HoneyPot.sendReward(privateKey, pool.honeyPotAddress)
              console.log(sendRewardsResponse, 'send rewards response')
              //Send the reward to the poolAddress
              const distributeRewardsResponse = await MyCollectives.Pool.distributeRewards(privateKey, pool.publicAddress)
              console.log(distributeRewardsResponse, 'distribute rewards response')

            }
          }
        }


      }
    } catch (error) {
      console.log(error, "error in top contributor");
    }
  }
}
