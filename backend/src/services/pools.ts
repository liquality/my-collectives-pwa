import { dbClient } from "../data";
import { ChallengeWithMeta } from "../models/challenges";
import { Pool, CreatePoolRequest, PoolWithMeta } from "../models/pool";
import { getTokenMetadataFromZora } from "../utils";

export class PoolsService {
  public static async create(
    data: CreatePoolRequest,
    userId: string
  ): Promise<Pool | null> {
    const result = await dbClient("pools").insert(
      {
        ...data,
        createdBy: userId,
      },
      [
        "id",
        "groupId",
        "mintingContractAddress",
        "chainId",
        "tokenId",
        "createdAt",
      ]
    );
    if (result.length > 0) {
      return result[0];
    }

    return null;
  }

  public static async findByGroup(groupId: string): Promise<Pool[]> {
    const poolsWithChallenges = await dbClient
        .select(
          "pools.id as poolId",
          "pools.groupId",
          "pools.challengeId",
          "pools.createdBy",
          "challenges.id as challengeId",
          "challenges.name",
          "challenges.creatorOfMint",
          "challenges.chainId",
          "challenges.mintingContractAddress",
          "challenges.network",
          "challenges.kind",
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
        .where("pools.groupId", "=", groupId)
        .join("challenges", "pools.challengeId", "=", "challenges.id");

      return poolsWithChallenges;
  }

  public static async findAllPoolsThatAreExpired(): Promise<any[]> {
    const poolsWithChallenges = await dbClient
      .select(
        "pools.id as poolId",
        "pools.groupId",
        "pools.challengeId",
        "pools.createdBy",
        "challenges.createdAt",
        "challenges.id as challengeId",
        "challenges.name",
        "challenges.creatorOfMint",
        "challenges.chainId",
        "challenges.mintingContractAddress",
        "challenges.network",
        "challenges.kind",
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
      .join("challenges", "pools.challengeId", "=", "challenges.id")
      .where("challenges.expiration", "<=", new Date());

    return poolsWithChallenges;
  }
  //TODO: rewrite this function
  public static async find(id: string): Promise<PoolWithMeta | null> {
    /*  const pool = await dbClient("pools")
       .where("id", "=", id)
       .first<Pool>(
         "id",
         "groupId",
         "mintingContractAddress",
         "chainId",
         "tokenId",
         "createdAt"
       );
 
     if (pool) {
       const meta = await getTokenMetadataFromZora([pool]);
       if (meta && meta.length > 0) {
         const { imageUrl, name } = meta[0];
         return {
           ...pool,
           imageUrl,
           name,
         };
       }
 
       return pool as PoolWithMeta;
     } */
    return null;
  }
}
