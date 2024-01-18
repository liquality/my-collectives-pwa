import { ethers } from "ethers";
import { dbClient } from "../data";
import { PoolsService } from "./pools";
import { getTopContributorFromEvents } from "../utils/events-query/top-contributor-zora";
import * as MyCollectives from "@liquality/my-collectives-sdk";


export class RewardsService {
  constructor() {
    MyCollectives.setConfig({
      RPC_URL: process.env.RPC_URL || '',
      PIMLICO_API_KEY: process.env.PIMLICO_API_KEY,
      BICONOMY_PAYMASTER: process.env.BICONOMY_PAYMASTER,
      BICONOMY_BUNDLER_API_KEY: process.env.BICONOMY_BUNDLER_API_KEY,
      AA_PROVIDER: MyCollectives.AAProviders.PIMLICO,
    });
  }

  async getPoolParticipation(memberAddress: string, poolsAddress: string) {
    console.log(poolsAddress, 'poolsaddress?', memberAddress)
    const participationResponse = await MyCollectives.Pool.getParticipation(
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
    const totalContributions = await MyCollectives.Pool.getTotalContributions(poolsAddress);

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
      /*      console.log(user.publicAddress,
             pool.publicAddress, 'pools address') */
      const poolParticipation = await this.getPoolParticipation(
        user.publicAddress,
        pool.publicAddress
      );

      // console.log(poolParticipation, 'pool participation')
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

      //console.log(userRewards, 'userrewards array')
    }

    try {
      /*    const result = await dbClient.raw(
           `? ON CONFLICT ("publicAddress", "poolId", "groupId")
                 DO NOTHING
                 RETURNING *;`,
           [dbClient("user_rewards").insert(userRewards)]
         );
    */
      try {
        const hej = await RewardsService.setTopContributorGroup()

      } catch (error) {
        console.log(error, 'error getting top contri')
      }

      const result = dbClient("user_rewards").insert(userRewards)
      //console.debug("updated user_rewards:", result);
    } catch (error) {
      console.log(error, "user_rewards error");
      return { success: false };
    }
  }

  public static async setTopContributorGroup(): Promise<any> {
    let mnemonic = process.env.AUTHORIZED_OPERATOR_PHRASE || "YOUR MNEMONIC";
    let privateKey = ethers.Wallet.fromMnemonic(mnemonic).privateKey
    console.log(privateKey, 'privateKey')
    try {
      //1)Get all pools  that are expired
      const expiredPools = await PoolsService.findAllPoolsThatAreExpired()
      console.log(expiredPools, 'expired pools', expiredPools.length)

      const poolsToSetTopContributor: string[] = [];
      for (const pool of expiredPools) {
        //2) Check if topContributor has already been set 
        const topContributor = await MyCollectives.HoneyPot.getTopContributor(pool.honeyPotAddress)
        console.log(topContributor, 'HAS TOP CONTRIBUTOR BEEN SET?', pool.honeyPotAddress)
        // 3) If the top contributor is not set, add the pool to the new array
        if (topContributor !== ethers.constants.AddressZero) {
          poolsToSetTopContributor.push(pool);
        }
        console.log(pool.honeyPotAddress, 'honey pot address from pool')
        //6) Scrape events from ethers, create a leaderboard and return top contributor
        const topContributorAddress = await getTopContributorFromEvents(pool.createdAt, pool.expiration, pool.mintingContractAddress, pool.network)
        console.log(privateKey, pool.honeyPotAddress, topContributorAddress.address, 'MY PARAAAMS')
        const response = await MyCollectives.HoneyPot.setTopContributor(privateKey, pool.honeyPotAddress, topContributorAddress.address)
        console.log(response, 'wat is response TOP CONTRIBUTOR')
      }
    } catch (error) {
      console.log(error, 'error in top contributor')
    }

  }
}
