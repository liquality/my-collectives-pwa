import { ethers } from "ethers";
import { dbClient } from "../data";
import { Challenge } from "../models/challenges";
import { convertToDate, fetchReservoirData, getTokenMetadataFromZora } from "../utils";
import { AuthService } from "./auth";
const infuraRpcUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;

export class ChallengesService {

    public static async create(
        data: any,
        userId: string

    ): Promise<Challenge | null> {
        //TODO: change this to challenges data insert
        const { mintingContractAddress, tokenId, network, category, expiration, honeyPotAddress, platform, salt } = data
        const tokenData = await fetchReservoirData(mintingContractAddress, network, tokenId)
        const user = await AuthService.find(userId)
        const provider = new ethers.providers.JsonRpcProvider(infuraRpcUrl);

        const insertObject = {
            honeyPotAddress,
            mintingContractAddress,
            network,
            platform,
            category,
            salt,
            createdAt: new Date(),
            expiration: convertToDate(expiration),
            ...tokenData,
        };

        if (tokenData?.creatorOfMint) {
            insertObject.creatorOfMint = await provider.lookupAddress(tokenData.creatorOfMint) ?? tokenData.creatorOfMint;
        } else {
            insertObject.creatorOfMint = await provider.lookupAddress(user.publicAddress) ?? user.publicAddress;
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
                    "platform",
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
            } else if (!result[0].imageUrl || !result[0].totalMints || !result[0].name) {
                return null //TODO: add error handling; we could not fetch necessary NFT API Data
            }

            return null;
        } catch (error) {
            return null
        }

    }


    public static async update(challenge: Challenge): Promise<Challenge | null> {
        const { mintingContractAddress, tokenId, network, groupcount } = challenge;
        try {
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
                        "platform",
                        "floorPrice",
                        "expiration",
                        "expired",
                        "totalMints",
                        "imageUrl",
                        "network",
                        "creatorOfMint",
                        "honeyPotAddress",

                    ]
                ).where("id", "=", challenge.id);

                const resultObj = { groupcount, ...result[0], }
                if (result.length > 0) {
                    return resultObj;
                }

                // If the update didn't affect any rows, return null
                return null;
            } catch (error) {
                //If there was an error in Reservoir API, just return old challenges
                return challenge;
            }


        } catch (error) {

            // If error occurs in Reservoir API, best to just return old challenges data
            return challenge;
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
                "platform",
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

        const sortedChallenges = updatedChallenges.sort((a, b) => {
            const dateA = new Date(a?.expiration ?? 0);
            const dateB = new Date(b?.expiration ?? 0);
            // sort in ascending order (youngest first)
            return dateB.getTime() - dateA.getTime()
        });
        return sortedChallenges;
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
                "platform",
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
