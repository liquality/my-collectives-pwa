export interface Message {
    id?: number;
    userId: string;
    userAddress: string;
    content: string;
    createdAt?: string;
    groupId: string;
}


export type Group = {
    id: string;
    name: string;
    description: string;
    publicAddress: string;
    createdAt: Date | null;
    createdBy: string;
    mintCount: number;
    walletAddress: string
    nonceKey: bigint,
    memberCount: number;
    poolsCount: number;
    messagesCount: number;
    activePoolsCount: number;
};

export type PoolWithChallenge = {
    poolId: string;
    groupId: string;
    challengeId: string;
    createdBy: string;
    name: string;
    creatorOfMint: string;
    chainId: number;
    tokenId: string;
    imageUrl: string;
    category: string;
    platform: string;
    expiration: string;
    totalMints: number;
    honeyPotAddress: string;

    expired: null | boolean;
};







export interface GroupCreation {
    name?: string;
    createdBy: string
    description: string

}

export interface Invite {
    id: number;
    groupId: string;
    code?: string;
    usedAt?: Date;
    expireAt?: Date;
}

