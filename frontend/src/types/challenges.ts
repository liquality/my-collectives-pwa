import * as MyCollectives from "@liquality/my-collectives-sdk";
import { BigNumberish } from "ethers";

export interface ChallengeCreation {
    mintingContractAddress: string;
    chainId: string;
    tokenId?: string,
    category: string;
    network: string
    expiration: string
}

export interface Challenge {
    id: string;
    mintingContractAddress: string;
    chainId: number;
    tokenId: null | string;
    category: string;
    name: string;
    platform: MyCollectives.SupportedPlatforms
    description?: string;
    kind: string;
    floorPrice: string;
    expiration: string;
    expired: string;
    totalMints: number;
    imageUrl: string;
    groupCount?: number;
    network: string;
    challengeId?: string,
    creatorOfMint: null | string;
    groupcount?: string
    honeyPotAddress: string;
    salt: BigNumberish;
}


export interface Pool {
    id: string;
    groupId: string;
    mintingContractAddress?: string;
    chainId?: number;
    createdAt: Date;
    tokenId: string;
}



export type GroupedChallenge = {
    [key: string]: Challenge[];
};
