import knex from "knex";
import { dbClient } from "../data";
import { Challenge } from "../models/challenges";
import { Group, CreateGroupRequest, GroupAllInfo } from "../models/group";
import { giveUserInvitesForGroup } from "../utils";
import Pool from "mysql2/typings/mysql/lib/Pool";
import { PoolsController } from "../controllers/v1";
import { PoolsService } from "./pools";
import { getTopContributorFromEvents } from "../utils/events-query/top-contributor-zora";
import { Contract, ethers } from "ethers";
import { ChallengesService } from "./challenges";
import { getUserCollections } from "../utils/reservoir-api/user-collection";
//import * as MyCollective from "@liquality/my-collectives";
//import { Config } from "@liquality/my-collectives";

export class GroupsService {
  public static create(
    data: CreateGroupRequest,
    pools: any[],
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
              publicAddress: pool.publicAddress,
              createdAt: new Date()
            }));
            console.log(poolInsertData, 'poolInsertData')
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
      .groupBy("groups.id", "user_groups.admin") // Include "user_groups.admin" in the GROUP BY clause

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
        "user_groups.admin"

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
        "groups.mintCount"
      ])
      .orderBy("groups.createdAt", "desc");

    return result;
  }

  public static async findMembers(id: string): Promise<Group[]> {
    return dbClient("groups")
      .join("user_groups", "groups.id", "=", "user_groups.groupId")
      .join("users", "users.id", "=", "user_groups.userId")
      .where("groups.id", "=", id)
      .select<Group[]>("users.id", "users.publicAddress", "user_groups.admin");
  }

  public static async toggleAdminStatus(groupId: string, userIdForMemberToToggle: string, authenticatedUserId: string): Promise<any> {
    try {
      await dbClient.transaction(async (trx) => {
        const existingUserGroupForToggledUser = await trx('user_groups')
          .where({ groupId: groupId, userId: userIdForMemberToToggle })
          .first();
        const existingUserGroupForAuthedUser = await trx('user_groups')
          .where({ groupId: groupId, userId: authenticatedUserId })
          .first();
        //Check if the authenticated user is a admin or creator/group
        if (existingUserGroupForToggledUser && existingUserGroupForAuthedUser.admin) {
          // Toggle the admin status
          const updatedAdminStatus = !existingUserGroupForToggledUser.admin;
          await trx('user_groups')
            .where({ groupId: groupId, userId: userIdForMemberToToggle })
            .update({ admin: updatedAdminStatus });
        } else {
          throw Error
        }
      });
    } catch (error) {
      return { success: false }
    }
    return { success: true }
  }

  public static async getMyMints(publicAddress: string): Promise<any> {
    const challenges = await ChallengesService.findAll()
    console.log(challenges, 'challenges')
    const userCollections = await getUserCollections(publicAddress)
    console.log(userCollections, 'user collections')

    if (challenges && challenges.length) {
      const combinedArray = challenges.map(challenge => {
        const matchingCollection = userCollections.find((collection: { collection: { id: string; }; }) => {

          return collection.collection.id === challenge.mintingContractAddress;
        });
        console.log(matchingCollection, 'matching collection found!')

        if (matchingCollection) {
          return {
            ...challenge,
            ownershipTokenCount: matchingCollection.ownership.tokenCount,
          };
        }

        return challenge;
      });

      console.log(combinedArray, 'combined array???')
      return combinedArray;
    } else return null



  }



  /*   public static async find(id: string, authenticatedUserId: string): Promise<Group | null> {
      const existingUserGroupForAuthedUser = await dbClient('user_groups')
        .where({ groupId: id, userId: authenticatedUserId })
        .first();
  
      const result = await dbClient("groups")
        .where("id", "=", id)
        .first<Group>(
          "id",
          "name",
          "description",
          "publicAddress",
          "walletAddress",
          "nonceKey",
          "createdAt",
          "createdBy"
        );
      return { loggedInUserIsAdmin: existingUserGroupForAuthedUser.admin, ...result }
    } */

  public static async find(id: string, authenticatedUserId: string): Promise<Group | null> {
    const existingUserGroupForAuthedUser = await dbClient('user_groups')
      .where({ groupId: id, userId: authenticatedUserId })
      .first();

    const result: Group | null = await dbClient("groups")
      .where("id", "=", id)
      .first<Group>(
        "id",
        "name",
        "description",
        "publicAddress",
        "walletAddress",
        "nonceKey",
        "createdAt",
        "createdBy",
        "mintCount"
      );

    if (result) {
      const counts = await dbClient("groups")
        .leftJoin("user_groups", "groups.id", "=", "user_groups.groupId")
        .leftJoin("pools", "pools.groupId", "=", "groups.id")
        .leftJoin("challenges", "challenges.id", "=", "pools.challengeId")
        .leftJoin("messages", "messages.groupId", "=", "groups.id")
        .groupBy("groups.id", "user_groups.admin")
        .where("groups.id", "=", id)
        .select([
          dbClient.raw('count(distinct "user_groups"."userId") as "memberCount"'),
          dbClient.raw('count(distinct pools.id) as "poolsCount"'),
          dbClient.raw('count(distinct messages.id) as "messagesCount"'),
          dbClient.raw('count(distinct CASE WHEN challenges.expiration > CURRENT_TIMESTAMP THEN pools.id ELSE NULL END) as "activePoolsCount"'),
        ])
        .first();

      return {
        loggedInUserIsAdmin: existingUserGroupForAuthedUser?.admin || false,
        memberCount: counts.memberCount,
        poolsCount: counts.poolsCount,
        messagesCount: counts.messagesCount,
        activePoolsCount: counts.activePoolsCount,
        ...result,
      };
    }

    return null;
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
          publicAddress: pool.publicAddress,
          createdAt: new Date(),
        }));
        console.log(poolInsertData, 'poolinsertdata')
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



}

