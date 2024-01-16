import { ethers } from "ethers";
import { dbClient } from "../data";
import { setConfig, Pool, AAProviders } from "@liquality/my-collectives-sdk-node";

export class RewardsService {
  constructor() {
    setConfig({
      RPC_URL: process.env.RPC_URL || '',
      PIMLICO_API_KEY: process.env.PIMLICO_API_KEY,
      BICONOMY_PAYMASTER: process.env.BICONOMY_PAYMASTER,
      BICONOMY_BUNDLER_API_KEY: process.env.BICONOMY_BUNDLER_API_KEY,
      AA_PROVIDER: AAProviders.PIMLICO,
    });
  }

  async getPoolParticipation(memberAddress: string, poolsAddress: string) {
    console.log(poolsAddress, 'poolsaddress?', memberAddress)
    const participationResponse = await Pool.getParticipation(
      poolsAddress,
      memberAddress
    );

    console.log(participationResponse, 'participation respons')

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
    const totalContributions = await Pool.getTotalContributions(poolsAddress);

    return totalContributions;
  }

  async getRewards(poolsAddress: string) {
    const rewards = await Pool.getPoolReward(poolsAddress);
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
      console.log(user.publicAddress,
        pool.publicAddress, 'pools address')
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
          publicAddress: user.publicAddress,
          poolId: pool.poolId,
          groupId: pool.groupId,
        });
      }

      console.log(userRewards, 'userrewards array')
    }

    try {
      /*    const result = await dbClient.raw(
           `? ON CONFLICT ("publicAddress", "poolId", "groupId")
                 DO NOTHING
                 RETURNING *;`,
           [dbClient("user_rewards").insert(userRewards)]
         );
    */
      const result = dbClient("user_rewards").insert(userRewards)
      console.debug("updated user_rewards:", result);
    } catch (error) {
      console.log(error, "user_rewards error");
      return { success: false };
    }
  }
}
