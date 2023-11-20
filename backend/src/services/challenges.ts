import { dbClient } from "../data";
import { Challenge, ChallengeWithMeta } from "../models/challenges";
import { convertToDate, getTokenMetadataFromZora, getTokenMetadataFromZoraWhenCreatingChallenge } from "../utils";

export class ChallengesService {

    //TODO: when creating a challenge artist provides the following info:
    /*    
    table.string("mintingContractAddress").nullable();
    table.integer("chainId").nullable();
    table.string("tokenId").nullable();
    table.string("category").nullable(); //music, art, or other type
    table.string("platform").nullable(); //sound, zora or prohobition
    table.timestamp("expiration").nullable(); //example: 7 days from creation //expiration: new Date("2023-12-01T12:00:00Z")
    table.boolean("expired").nullable();
    */

    //And we have to find the following in zora SDK or Sound API then add in our db BEFORE we create full object:
    /* 
    table.integer("totalMints").nullable()
     table.string("imageUrl").nullable();
    */
    public static async create(
        data: any,

    ): Promise<Challenge | null> {
        //TODO: change this to challenges data insert
        console.log(data, 'this is data')

        //TODO based on data.platform we have to have diff scenarios not only Zora
        const meta = await getTokenMetadataFromZoraWhenCreatingChallenge(data)
        meta.expiration = convertToDate(meta.expiration)


        const result = await dbClient("challenges").insert(
            {
                ...meta,
                //createdBy: userId,
            },
            [
                "id",
                "mintingContractAddress",
                "chainId",
                "tokenId",
                "category",
                "platform",
                "expiration",
                "expired",
                "totalMints",
                "imageUrl"
                // "creatorOfMint"
            ]
        );
        if (result.length > 0) {
            return result[0];
        }

        return null;
    }


    public static async findAll(): Promise<any[]> {
        const challenges = await dbClient("challenges").select<Challenge[]>(
            "id",
            "mintingContractAddress",
            "chainId",
            "tokenId",
            "createdAt"
        );
        const meta = await getTokenMetadataFromZora(challenges);
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

        return challenges as any[];
    }

    public static async find(id: string): Promise<any | null> {
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

            return challenge as any;
        }
        return null;
    }
}
