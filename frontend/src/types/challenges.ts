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
    kind: string;
    floorPrice: string;
    expiration: string;
    expired: string;
    totalMints: number;
    imageUrl: string;
    network: string;
    creatorOfMint: null | string;
    groupcount?: string
}


export interface Pool {
    id: string;
    groupId: string;
    mintingContractAddress?: string;
    chainId?: number;
    createdAt: Date;
    tokenId: string;
}

