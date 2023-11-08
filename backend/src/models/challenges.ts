export interface Challenge {
    id: string;
    mintingContractAddress: string;
    chainId: number;
    tokenId: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
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

