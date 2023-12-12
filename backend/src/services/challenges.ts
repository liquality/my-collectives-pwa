import { dbClient } from "../data";
import { Challenge } from "../models/challenges";
import { convertToDate, fetchReservoirData, getTokenMetadataFromZora } from "../utils";

export class ChallengesService {

    public static async create(
        data: any,
        userId: string

    ): Promise<Challenge | null> {
        //TODO: change this to challenges data insert
        const { mintingContractAddress, tokenId, network, category, expiration } = data
        const metaTwo = await fetchReservoirData(mintingContractAddress, network, tokenId)
        try {
            const result = await dbClient("challenges").insert(
                {
                    mintingContractAddress,
                    network, category,
                    expiration: convertToDate(expiration),
                    ...metaTwo,
                    //createdBy: userId,
                },
                [
                    "id",
                    "mintingContractAddress",
                    "chainId",
                    "tokenId",
                    "category",
                    "name",
                    "kind",
                    "floorPrice",
                    "expiration",
                    "expired",
                    "totalMints",
                    "imageUrl",
                    "network",
                    "creatorOfMint"
                ]
            );

            if (result.length > 0) {
                return result[0];
            }

            return null;
        } catch (error) {
            console.log(error, 'wats err?')
            return null
        }

    }


    public static async findAll(): Promise<any[]> {
        const challenges = await dbClient("challenges")
            .select(
                "challenges.id",
                "mintingContractAddress",
                "chainId",
                "tokenId",
                "category",
                "challenges.name", // Specify the table alias or table name
                "kind",
                "floorPrice",
                "expiration",
                "expired",
                "totalMints",
                "imageUrl",
                "network",
                "creatorOfMint",
                dbClient.raw('COUNT(groups.id) as groupCount')
            )
            .leftJoin("pools", "challenges.id", "pools.challengeId")
            .leftJoin("groups", "pools.groupId", "groups.id")
            .groupBy("challenges.id")
            .orderBy("challenges.id", "asc");

        return challenges;
    }



    public static async find(id: string): Promise<any | null> {
        const challenge = await dbClient("challenges")
            .where("id", "=", id)
            .first<Challenge>(
                "id",
                "mintingContractAddress",
                "chainId",
                "tokenId",
                "category",
                "name",
                "kind",
                "floorPrice",
                "expiration",
                "expired",
                "totalMints",
                "imageUrl",
                "network",
                "creatorOfMint"
            );

        if (challenge) {
            const meta = await getTokenMetadataFromZora([challenge]);
            if (meta && meta.length > 0) {
                const { imageUrl, name } = meta[0];
                return {
                    ...challenge,
                    imageUrl,
                    name,
                };
            }

            return challenge as any;
        }
        return null;
    }
}
