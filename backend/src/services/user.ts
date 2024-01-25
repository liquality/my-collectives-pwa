import { BigNumber, utils } from "ethers";
import { dbClient } from "../data";
import { RewardsService } from "./rewards";

export class UserService {
  public static async getMints(userId: string): Promise<any[]> {
    return dbClient.transaction(async (trx) => {
      const poolsWithChallenges = await trx
        .select(
          "pools.id as poolId",
          "pools.groupId",
          "pools.challengeId",
          "pools.createdBy",
          "challenges.id as challengeId",
          "challenges.name",
          "challenges.creatorOfMint",
          "challenges.chainId",
          "challenges.tokenId",
          "challenges.imageUrl",
          "challenges.category",
          "challenges.platform",
          "challenges.expiration",
          "challenges.totalMints",
          "challenges.expired",
          "challenges.honeyPotAddress"
        )
        .from("pools")
        // .where('pools.groupId', '=', groupId)
        .join("challenges", "pools.challengeId", "=", "challenges.id")
        .join("user_rewards", "pools.challengeId", "=", "challenges.id");

      return poolsWithChallenges;
    });
  }

  public static async getRewardsSummary(userId: string): Promise<any> {
    const rewardsService = new RewardsService();
    await rewardsService.syncPoolsData(userId);

    const invites = await dbClient("invites")
      .join("users", "users.id", "=", "invites.userId")
      .join("groups", "groups.id", "=", "invites.groupId")
      .where("invites.userId", "=", userId)
      .whereNotNull("invites.usedAt")
      .count("invites.userId");

    const userRewards = await dbClient("user_rewards")
      .join("users", "users.id", "=", "user_rewards.userId")
      .join("pools", "pools.id", "=", "user_rewards.poolId")
      .join("challenges", "challenges.id", "=", "pools.challengeId")
      .where("user_rewards.userId", "=", userId)
      .select(
        "user_rewards.*",
        "users.*",
        "pools.publicAddress as poolPublicAddress",
        "challenges.honeyPotAddress as challengeHoneyPotAddress",
        "challenges.expiration as challengeExpiration"
      );

    const rewards = await dbClient("user_rewards")
      .join("users", "users.id", "=", "user_rewards.userId")
      .where("user_rewards.userId", "=", userId)
      .select("user_rewards.numberOfMints", "user_rewards.amountInEthEarned");
    var mintsAmount = rewards.reduce(
      (acc, curr) => acc + parseInt(curr.numberOfMints || "0"),
      0
    );

    var ethEarned = rewards.reduce((acc: BigNumber, curr: any) => {
      const amount = utils.parseUnits(curr.amountInEthEarned, "ether");
      acc = acc.add(BigNumber.from(amount));
      return acc;
    }, BigNumber.from(0));
    let poolsAddressBalances: any = [];

    console.log(userRewards, 'user rewards')
    try {
      poolsAddressBalances = await Promise.all(
        userRewards.map(async (reward) => {
          const honeyPotBalance = await RewardsService.getPoolAddressBalance(
            reward.poolPublicAddress
          );
          return {
            address: reward.poolPublicAddress,
            balance: honeyPotBalance?.balanceInWei.toString(),
          };
        })
      );
    } catch (error) {
      console.error(error, "Getting HonyPot Balances")
    }

    return {
      ethEarned: utils.formatUnits(ethEarned, "ether"),
      mintsAmount,
      rewardsCount: parseInt(`${userRewards[0].count || 0}`),
      invitesCount: parseInt(`${invites[0].count || 0}`),
      user_rewards: userRewards,
      poolsAddressBalances,
    };
  }
}
