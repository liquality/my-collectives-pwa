import { ethers } from "ethers";
import { dbClient } from "../data";
import MyCollectives, { Config } from "@liquality/my-collectives-sdk-node";

export class RewardsService {
  constructor() {
    MyCollectives.setConfig({} as Config);
  }

  async getPoolParticipation(memberAddress: string, poolsAddress: string) {
    const participationResponse = await MyCollectives.Pool.getParticipation(
      poolsAddress,
      memberAddress
    );

    if (participationResponse && participationResponse.participant != "") {
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
      .join("challenges", "pools.challengeId", "=", "challenges.id")
      .where("challenges.expiration", ">", new Date());

    const userRewards: any[] = [];
    for (const pool of pools) {
      const poolParticipation = await this.getPoolParticipation(
        user.publicAddress,
        pool.publicAddress
      );
      if (poolParticipation) {
        userRewards.push({
          numberOfMints: poolParticipation.contribution,
          amountInEthEarned: pool.rewardAmount,
          userId: user.id,
          publicAddress: user.publicAddress,
          poolId: pool.poolId,
          groupId: pool.groupId,
        });
      }
    }

    try {
      const result = await dbClient.raw(
        `? ON CONFLICT (publicAddress, poolId, groupId)
              DO NOTHING
              RETURNING *;`,
        [dbClient("user_rewards").insert(userRewards)]
      );

      console.debug("updated user_rewards:", result);
    } catch (error) {
      console.log(error, "user_rewards error");
      return { success: false };
    }
  }
}
