export interface Challenge {
    id: string;
    mintingContractAddress: string;
    chainId: string;
    tokenId?: string,
    category: string;
    imageUrl: string;
    totalMints: number;
    platform: string
    expiration: string
    expired: boolean
    honeyPotAddress: string;

}


export interface ChallengeWithMeta {
    id: string;
    mintingContractAddress?: string;
    chainId?: number;
    createdAt: Date;
    tokenId: string;
    imageUrl: string;
    name?: string | null;
}

