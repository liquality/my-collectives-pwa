import { dbClient } from "../data";
import { Challenge, ChallengeWithMeta } from "../models/challenges";
import { convertToDate, fetchReservoirData, getTokenMetadataFromZora, getTokenMetadataFromZoraWhenCreatingChallenge } from "../utils";

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

        const { mintingContractAddress, tokenId, network, category, expiration } = data

        //TODO based on data.platform we have to have diff scenarios not only Zora
        //const meta = await getTokenMetadataFromZoraWhenCreatingChallenge(data)
        const metaTwo = await fetchReservoirData(mintingContractAddress, network, tokenId)
        console.log(metaTwo, 'wats META?')


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
                    "platform",
                    "expiration",
                    "expired",
                    "totalMints",
                    "imageUrl",
                    "creatorOfMint"
                ]
            );
            console.log(result, 'wats Result of insert?')

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
        const challenges = await dbClient("challenges").select<Challenge[]>(
            "id",
            "mintingContractAddress",
            "chainId",
            "tokenId",
            "category",
            "name",
            "platform",
            "expiration",
            "expired",
            "totalMints",
            "imageUrl",
            "creatorOfMint"
        );
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
