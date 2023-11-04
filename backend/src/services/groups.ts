import { dbClient } from "../data";
import { Group, CreateGroupRequest } from "../models/group";

export class GroupsService {
  public static create(
    data: CreateGroupRequest,
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
              "rewards",
              "createdAt",
            ]
          );

          await trx("user_groups").insert({
            groupId: result.id,
            userId,
            admin: true, // first user is admin by default
          });
          // TODO: emit EVENT
          // io.emit("groupCreation", "EMITTED CREATION EVENT");
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
        "groups.rewards",
        "groups.createdAt"
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
      .first<Group>(
        "id",
        "name",
        "description",
        "publicAddress",
        "rewards",
        "createdAt"
      );
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
