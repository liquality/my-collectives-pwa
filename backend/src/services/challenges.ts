import { dbClient } from "../data";
import { Challenge, ChallengeWithMeta } from "../models/challenges";
import { getTokenMetadataFromZora } from "../utils";

export class ChallengesService {
    public static async create(
        data: any,
        userId: string
    ): Promise<Challenge | null> {
        //TODO: change this to challenges data insert
        const result = await dbClient("challenges").insert(
            {
                ...data,
                createdBy: userId,
            },
            [
                "id",
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


    public static async findAll(): Promise<ChallengeWithMeta[]> {
        const challenges = await dbClient("challenges").select<Challenge[]>(
            "id",
            "mintingContractAddress",
            "chainId",
            "tokenId",
            "createdAt"
        );
        console.log(challenges, 'CHALLENGES?')
        const meta = await getTokenMetadataFromZora(challenges);
        console.log(meta, 'wats metA??')
        if (meta && meta.length > 0) {
            return challenges.map((challenge) => {
                const challengeMeta = meta.find(
                    (meta) =>
                        meta.tokenId === challenge.tokenId &&
                        meta.collectionAddress === challenge.mintingContractAddress
                );
                const { imageUrl, name } = challengeMeta || {};
                return {
                    ...challenge,
                    imageUrl: imageUrl || "",
                    name,
                };
            });
        }

        return challenges as ChallengeWithMeta[];
    }

    public static async find(id: string): Promise<ChallengeWithMeta | null> {
        const challenge = await dbClient("challenges")
            .where("id", "=", id)
            .first<Challenge>(
                "id",
                "mintingContractAddress",
                "chainId",
                "tokenId",
                "createdAt"
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

            return challenge as ChallengeWithMeta;
        }
        return null;
    }
}
