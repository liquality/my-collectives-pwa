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
    return dbClient("pools")
      .where("groupId", "=", groupId)
      .select<Pool[]>(
        "id",
        "groupId",
        "mintingContractAddress",
        "chainId",
        "tokenId",
        "createdAt"
      );
  }

  //TODO: rewrite this function completly 
  public static async findAll(): Promise<any[]> {
    /*
     
        const pools = await dbClient("pools").select<Pool[]>(
         "id",
         "groupId",
         "mintingContractAddress",
         "chainId",
         "tokenId",
         "createdAt"
       );
       const meta = await getTokenMetadataFromZora(pools);
       if (meta && meta.length > 0) {
         return pools.map((pool) => {
           const poolMeta = meta.find(
             (meta) =>
               meta.tokenId === pool.tokenId &&
               meta.collectionAddress === pool.mintingContractAddress
           );
           const { imageUrl, name } = poolMeta || {};
           return {
             ...pool,
             imageUrl: imageUrl || "",
             name,
           };
         });
       }
   
       return pools as PoolWithMeta[]; */
    return []
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
