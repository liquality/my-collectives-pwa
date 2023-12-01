import knex from "knex";
import { dbClient } from "../data";
import { Challenge } from "../models/challenges";
import { Group, CreateGroupRequest, GroupAllInfo } from "../models/group";
import { giveUserInvitesForGroup } from "../utils";

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
          await giveUserInvitesForGroup(userId, groupResult['id'], 10);
        }

        resolve(groupResult);
      } catch (error) {
        reject(error);
      }
    });
  }




  public static async findByUserAddress(address: string): Promise<GroupAllInfo[]> {
    const result: any[] = await dbClient('groups')
      .leftJoin('user_groups', 'groups.id', '=', 'user_groups.groupId')
      .leftJoin('users', 'users.id', '=', 'user_groups.userId')
      .leftJoin('pools', 'pools.groupId', '=', 'groups.id')
      .leftJoin('challenges', 'challenges.id', '=', 'pools.challengeId') // Join with challenges table
      .leftJoin('messages', 'messages.groupId', '=', 'groups.id')
      .where('users.publicAddress', '=', address)
      .groupBy('groups.id')
      .select([
        'groups.id',
        'groups.name',
        'groups.description',
        'groups.publicAddress',
        'groups.createdAt',
        'groups.createdBy',
        'groups.mintCount'
      ])
      .countDistinct({ memberCount: 'user_groups.userId' })
      .countDistinct({ poolsCount: 'pools.id' })
      .countDistinct({ messagesCount: 'messages.id' })
      .countDistinct({ activePoolsCount: dbClient.raw('CASE WHEN challenges.expiration > CURRENT_TIMESTAMP THEN pools.id ELSE NULL END') })
      .orderBy('groups.createdAt', 'desc');

    console.log(result, 'wats result?')


    return result
  }



  public static async findMembers(id: string): Promise<Group[]> {
    return dbClient("groups")
      .join("user_groups", "groups.id", "=", "user_groups.groupId")
      .join("users", "users.id", "=", "user_groups.userId")
      .where("groups.id", "=", id)
      .select<Group[]>("user.id", "user.publicAddress");
  }

  public static find(id: string): Promise<Group | null> {
    return dbClient("groups")
      .where("id", "=", id)
      .first<Group>("id", "name", "description", "publicAddress", "createdAt");
  }




}
