import { dbClient } from "../data";
import { Invite, InviteCreateRequest } from "../models/invite";

export class InvitesService {
  public static async create(
    data: InviteCreateRequest,
    userId: string
  ): Promise<Invite | null> {
    const [result] = await dbClient("invites").insert(
      {
        ...data,
        createdBy: userId,
      },
      ["id", "groupId", "code", "expireAt", "createdAt"]
    );

    return result;
  }

  public static async claim(id: string, userId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      dbClient.transaction(async (trx) => {
        try {
          const [result] = await trx("groups")
            .where("id", "=", id)
            .whereNull("usedAt")
            .update(
              {
                usedAt: dbClient.fn.now(),
                usedBy: userId,
              },
              ["id"]
            );

          if (result && result.id) {
            await trx("user_groups").insert({
              groupId: result.id,
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
}
