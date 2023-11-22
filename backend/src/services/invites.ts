import { dbClient } from "../data";
import { Invite, InviteCreateRequest } from "../models/invite";
import { generateInviteCode } from "../utils";

export class InvitesService {


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
              userId
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

  public static async claimByCode(code: string, userId: string): Promise<boolean> {
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
              ["id", 'groupId']
            );

          if (result && result.id) {
            await trx("user_groups").insert({
              groupId: result.groupId,
              userId
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
    return dbClient("invites")
      .where("id", "=", id)
      .whereNull("usedAt")
      .first<Invite>("id", "groupId", "code", "expireAt", "createdAt");
  }

  public static findByCode(code: string): Promise<Invite | null> {
    // TUDO: validate dates of expire at and userAt
    return dbClient("invites")
      .where("id", "=", code)
      .whereNull("usedAt")
      .first<Invite>("id", "groupId", "code", "expireAt", "createdAt");
  }

  public static findAllByGroup(id: string): Promise<Invite[]> {
    // TUDO: validate dates of expire at and userAt
    return dbClient("invites")
      .where("groupId", "=", id)
      .whereNull("usedAt")
      .select("id", "groupId", "code", "expireAt", "createdAt");
  }

  
}
