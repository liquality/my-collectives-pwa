import knex from "knex";
import { dbClient } from "../data";
import { Challenge } from "../models/challenges";
import { Group, CreateGroupRequest, GroupAllInfo } from "../models/group";
import { giveUserInvitesForGroup } from "../utils";
import Pool from "mysql2/typings/mysql/lib/Pool";
import { PoolsController } from "../controllers/v1";
import { PoolsService } from "./pools";
//import * as MyCollective from "@liquality/my-collectives";
//import { Config } from "@liquality/my-collectives";

export class GroupsService {
  public static create(
    data: CreateGroupRequest,
    pools: Challenge[],
    userId: string
  ): Promise<Group | null> {
    return new Promise(async (resolve, reject) => {
      let groupResult: Group | null = null;

      try {
        await dbClient.transaction(async (trx) => {
          [groupResult] = await trx("groups").insert(
            {
              ...data,
              createdBy: userId,
              createdAt: dbClient.fn.now(),
              updatedAt: dbClient.fn.now(),
            },
            [
              "id",
              "name",
              "description",
              "publicAddress",
              "createdBy",
              "mintCount",
              "createdAt",
            ]
          );

          await trx("user_groups").insert({
            groupId: groupResult?.id,
            userId,
            admin: true, // first user is admin by default
          });

          if (pools && pools?.length > 0) {
            const poolInsertData = pools.map((pool) => ({
              groupId: groupResult?.id,
              createdBy: userId,
              challengeId: pool.id,
            }));
            await trx("pools").insert(poolInsertData);
          }
        });

        // Group has been created, now you can give invites, creator of group gets 10 invites
        if (groupResult) {
          await giveUserInvitesForGroup(userId, groupResult["id"], 10);
        }

        resolve(groupResult);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static async findByUserAddress(
    address: string
  ): Promise<GroupAllInfo[]> {
    const result: any[] = await dbClient("groups")
      .leftJoin("user_groups", "groups.id", "=", "user_groups.groupId")
      .leftJoin("users", "users.id", "=", "user_groups.userId")
      .leftJoin("pools", "pools.groupId", "=", "groups.id")
      .leftJoin("challenges", "challenges.id", "=", "pools.challengeId") // Join with challenges table
      .leftJoin("messages", "messages.groupId", "=", "groups.id")
      .where("users.publicAddress", "=", address)
      .groupBy("groups.id")
      .select([
        "groups.id",
        "groups.name",
        "groups.description",
        "groups.publicAddress",
        "groups.walletAddress",
        "groups.nonceKey",
        "groups.salt",
        "groups.createdAt",
        "groups.createdBy",
        "groups.mintCount",
      ])
      .countDistinct({ memberCount: "user_groups.userId" })
      .countDistinct({ poolsCount: "pools.id" })
      .countDistinct({ messagesCount: "messages.id" })
      .countDistinct({
        activePoolsCount: dbClient.raw(
          "CASE WHEN challenges.expiration > CURRENT_TIMESTAMP THEN pools.id ELSE NULL END"
        ),
      })
      .orderBy("groups.createdAt", "desc");

    await this.setTopContributorGroup()

    return result;
  }

  public static async findByChallenge(
    challengeId: string
  ): Promise<GroupAllInfo[]> {
    const result: any[] = await dbClient("pools")
      .leftJoin("groups", "pools.groupId", "=", "groups.id")
      .leftJoin("challenges", "challenges.id", "=", "pools.challengeId")
      .leftJoin("user_groups", "groups.id", "=", "user_groups.groupId")
      .leftJoin("users", "users.id", "=", "user_groups.userId")
      .where("challenges.id", "=", challengeId)
      .groupBy("groups.id")
      .select([
        "groups.id",
        "groups.name",
        "groups.description",
        "groups.publicAddress",
        "groups.walletAddress",
        "groups.nonceKey",
        "groups.createdAt",
        "groups.createdBy",
        "groups.mintCount",
      ])
      .orderBy("groups.createdAt", "desc");

    return result;
  }

  public static async findMembers(id: string): Promise<Group[]> {
    return dbClient("groups")
      .join("user_groups", "groups.id", "=", "user_groups.groupId")
      .join("users", "users.id", "=", "user_groups.userId")
      .where("groups.id", "=", id)
      .select<Group[]>("users.id", "users.publicAddress");
  }

  public static find(id: string): Promise<Group | null> {
    return dbClient("groups")
      .where("id", "=", id)
      .first<Group>(
        "id",
        "name",
        "description",
        "publicAddress",
        "walletAddress",
        "nonceKey",
        "createdAt"
      );
  }

  public static async update(
    id: string,
    updatedGroupFields: Partial<Group>,
    pools: any[],
    userId: string
  ): Promise<any> {
    const existingPools = await dbClient("pools")
      .select("challengeId")
      .where("groupId", "=", id);
    // identify pools to be inserted (new ones) and removed (existing ones not in the updated array)

    const queryResult = await dbClient("groups")
      .where("id", "=", id)
      .update(updatedGroupFields);

    if (pools.length) {
      const newPools = pools.filter(
        (pool) =>
          !existingPools.some(
            (existingPool) =>
              existingPool.challengeId === pool.id ||
              existingPool.challengeId === pool.challengeId
          )
      );
      const poolsToRemove = existingPools.filter(
        (existingPool) =>
          !pools.some(
            (pool) =>
              existingPool.challengeId === pool.id ||
              existingPool.challengeId === pool.challengeId
          )
      );
      // insert new pools
      if (newPools.length > 0) {
        const poolInsertData = newPools.map((pool) => ({
          groupId: id,
          createdBy: userId,
          challengeId: pool.id,
          createdAt: new Date(),
        }));
        await dbClient("pools").insert(poolInsertData);
      }

      // remove pools that are not in the updated array
      if (poolsToRemove.length > 0) {
        const challengeIdsToRemove = poolsToRemove.map(
          (existingPool) => existingPool.challengeId
        );
        await dbClient("pools")
          .where("groupId", "=", id)
          .whereIn("challengeId", challengeIdsToRemove)
          .del();
      }
    }

    return queryResult;
  }

  public static async setTopContributorGroup(): Promise<any> {
    try {
      //1)Get all pools  that are expired
      const expiredPools = await PoolsService.findAllPoolsThatAreExpired()

      //4) Check if topContributor has already been set 
      //MyCollective.setConfig({} as Config);
      const poolsToSetTopContributor = [];

      for (const pool of expiredPools) {
        console.log(pool, 'ONE POOL')

        const topContributor = false
        //const topContributor = await MyCollective.HoneyPot.getTopContributor(pool.honeyPotAddress)
        console.log(topContributor, 'HAS TOP CONTRIBUTOR BEEN SET?', pool.honeyPotAddress)
        // 3) If the top contributor is not set, add the pool to the new array
        if (!topContributor) {
          poolsToSetTopContributor.push(pool);
        }
      }
    } catch (error) {
      console.log(error, 'error in top contributor')
    }





    //4) Check if topContributor has already been set getTopContributor(pool.honeyPotAddress: string)
    //5) It it has, return null if it hasnt, proceed to step 6)
    //6) Scrape events from ethers, create a leaderboard from challengeCreation -> challengeExpiration but in blocks 
    // I need: ChallengeCreationTime, ChallengeExpirationTime, tokenContract(mintingContractAddress)




  }
}
