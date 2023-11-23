import { dbClient } from "../data";
import { Challenge } from "../models/challenges";
import { Group, CreateGroupRequest } from "../models/group";

export class GroupsService {
  public static create(
    data: CreateGroupRequest,
    pools: Challenge[],
    userId: string
  ): Promise<Group | null> {
    return new Promise((resolve, reject) => {
      dbClient.transaction(async (trx) => {
        try {
          const [result] = await trx("groups").insert(
            {
              ...data,
              createdBy: userId,
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
            groupId: result.id,
            userId,
            admin: true, // first user is admin by default
          });
          if (pools && pools.length > 0) {
            const poolInsertData = pools.map((pool) => ({
              groupId: result.id,
              createdBy: userId,
              challengeId: pool.id,
            }));
            await trx("pools").insert(poolInsertData);
          }

          // invites update
          const inviteIds = await trx("invites")
            .select("id")
            .where("groupId", null)
            .andWhere("usedAt", null)
            .pluck("id")
            .limit(5);
            
          const expireAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days
          await trx("invites")
            .update({ groupId: result.id, expireAt })
            .whereIn("id", inviteIds);

          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public static async findByUserAddress(address: string): Promise<Group[]> {
    return dbClient("groups")
      .join("user_groups", "groups.id", "=", "user_groups.groupId")
      .join("users", "users.id", "=", "user_groups.userId")
      .where("users.publicAddress", "=", address)
      .select<Group[]>(
        "groups.id",
        "groups.name",
        "groups.description",
        "groups.publicAddress",
        "groups.createdAt",
        "groups.createdBy"
      );
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

  public static async addMember(
    id: string,
    data: any,
    createdBy: string
  ): Promise<boolean> {
    try {
      const { id: userId } = await dbClient("users")
        .where("publicAddress", "=", data.publicAddress)
        .first("id");
      await dbClient("user_groups").insert({
        groupId: id,
        userId,
        createdBy, // first user is admin by default
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
