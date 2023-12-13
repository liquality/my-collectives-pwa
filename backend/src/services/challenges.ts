import { dbClient } from "../data";
import { Challenge } from "../models/challenges";
import { convertToDate, fetchReservoirData, getTokenMetadataFromZora } from "../utils";
import { AuthService } from "./auth";

export class ChallengesService {

    public static async create(
        data: any,
        userId: string

    ): Promise<Challenge | null> {
        //TODO: change this to challenges data insert
        const { mintingContractAddress, tokenId, network, category, expiration, honeyPotAddress } = data
        const tokenData = await fetchReservoirData(mintingContractAddress, network, tokenId)
        const user = await AuthService.find(userId)

        const insertObject = {
            honeyPotAddress,
            mintingContractAddress,
            network,
            category,
            expiration: convertToDate(expiration),
            ...tokenData,
        };

        if (tokenData?.creatorOfMint) {
            insertObject.creatorOfMint = tokenData.creatorOfMint;
        } else {
            insertObject.creatorOfMint = user.publicAddress;
        }

        try {
            const result = await dbClient("challenges").insert(
                insertObject,
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
                    "creatorOfMint",
                    "honeyPotAddress"
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


    public static async update(challenge: Challenge): Promise<Challenge | null> {
        const { mintingContractAddress, tokenId, network, } = challenge;
        const tokenData = await fetchReservoirData(mintingContractAddress, network, tokenId ?? undefined);

        const insertObject = {
            floorPrice: tokenData?.floorPrice,
            totalMints: tokenData?.totalMints,
            name: tokenData?.name
        };


        try {
            const result = await dbClient("challenges").update(
                insertObject,
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
                    "creatorOfMint",
                    "honeyPotAddress"
                ]
            ).where("id", "=", challenge.id);

            if (result.length > 0) {
                return result[0];
            }

            // If the update didn't affect any rows, return null
            return null;
        } catch (error) {
            console.log(error, 'wats err?');
            // Handle the error if needed
            return null;
        }
    }



    public static async findAll(): Promise<any[] | null> {
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
                "honeyPotAddress",
                dbClient.raw('COUNT(groups.id) as groupCount')
            )
            .leftJoin("pools", "challenges.id", "pools.challengeId")
            .leftJoin("groups", "pools.groupId", "groups.id")
            .groupBy("challenges.id")
            .orderBy("challenges.id", "asc");

        const updatedChallenges = await Promise.all(challenges.map(async (challenge) => {
            const updatedChallenge = await this.update(challenge);
            return updatedChallenge;
        }));



        return updatedChallenges;
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
