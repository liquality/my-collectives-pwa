import { dbClient } from "../data";
import { Invite } from "../models/invite";

export class InvitesService {
  public static get joinQuery() {
    return dbClient("invites")
      .join("users", "users.id", "=", "invites.userId")
      .join("groups", "groups.id", "=", "invites.groupId");
  }

  public static joinSelect = [
    "invites.id",
    "invites.groupId",
    "invites.code",
    "invites.expireAt",
    "invites.createdAt",
    "groups.name as groupName",
    "groups.description as groupDescription",
    "groups.publicAddress as groupAddress",
    "users.publicAddress as userAddress",
  ];

  public static async claim(id: string, userId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      dbClient.transaction(async (trx) => {
        try {
          const [result] = await trx("invites")
            .where("id", "=", id)
            .whereNull("usedAt")
            .update(
              {
                usedAt: dbClient.fn.now(),
                usedBy: userId,
              },
              ["id", "groupId"]
            );

          if (result && result.id) {
            await trx("user_groups").insert({
              groupId: result.groupId,
              userId,
            });
            resolve(result);
          } else {
            reject(new Error("Invite not found"));
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public static async claimByCode(
    code: string,
    userId: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      dbClient.transaction(async (trx) => {
        try {
          const [result] = await trx("invites")
            .where("code", "=", code)
            .whereNull("usedAt")
            .update(
              {
                usedAt: dbClient.fn.now(),
                usedBy: userId,
              },
              ["id", "groupId"]
            );

          if (result && result.id) {
            await trx("user_groups").insert({
              groupId: result.groupId,
              userId,
            });
            resolve(result);
          } else {
            reject(new Error("Invite not found"));
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public static find(id: string): Promise<Invite | null> {
    // TUDO: validate dates of expire at and userAt
    return this.joinQuery
      .where("invites.id", "=", id)
      .whereNull("invites.usedAt")
      .first<Invite>(this.joinSelect);
  }

  public static findByCode(code: string): Promise<Invite | null> {
    // TUDO: validate dates of expire at and userAt
    return this.joinQuery
      .where("invites.code", "=", code)
      .whereNull("invites.usedAt")
      .first<Invite>(this.joinSelect);
  }

  public static findAllByGroup(id: string, userId: string, top: number = 1): Promise<Invite[]> {
    // TUDO: validate dates of expire at and userAt
    return this.joinQuery
      .where("invites.groupId", "=", id)
      .andWhere("invites.userId", "=", userId)
      .whereNull("invites.usedAt")
      .select(this.joinSelect)
      .limit(top);
  }

  public static findAllByUser(id: string, groupId?: string): Promise<Invite[]> {
    // TUDO: validate dates of expire at and userAt
    let query = dbClient("invites")
      .join("users", "users.id", "=", "invites.userId")
      .join("groups", "groups.id", "=", "invites.groupId")
      .where("invites.userId", "=", id);
    if (groupId) {
      query = query.andWhere("invites.groupId", "=", groupId);
    }
    return query.whereNull("invites.usedAt").select(this.joinSelect);
  }
}
