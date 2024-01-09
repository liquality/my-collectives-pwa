import { ethers } from "ethers";
import { dbClient } from "../data";
import {
  convertToDate,
  fetchReservoirData,
  getTokenMetadataFromZora,
} from "../utils";
import MyCollectives, { Config } from "@liquality/my-collectives-sdk";


export class RewardsService {
  constructor() {
    MyCollectives.setConfig({} as Config);
  }

  async getPoolData(memberAddress: string, poolsAddress: string) {
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

      // const totalContributions = await MyCollectives.Pool.getTotalContributions(
      //   poolsAddress
      // );
      // const rewards = await MyCollectives.Pool.getPoolReward(poolsAddress);

      return participation;
      // return {
      //   poolsAddress,
      //   participation,
      //   totalContributions,
      //   rewards,
      // };
    }

    return null;
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

    const userRewards = [];
    for (const pool of pools) {
      const poolData = await this.getPoolData(
        user.publicAddress,
        pool.publicAddress
      );
      if (poolData) {
        userRewards.push({
          numberOfMints: poolData.contribution,
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
