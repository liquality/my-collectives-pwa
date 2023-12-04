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
    publicAddress: string | null;
    createdAt: Date | null;
    createdBy: string;
    mintCount: number;
    memberCount: number;
    poolsCount: number;
    messagesCount: number;
    activePoolsCount: number;
};






export interface GroupCreation {
    name?: string;
    createdBy: string
    description: string
    publicAddress: string
}

export interface Invite {
    id: number;
    groupId: string;
    code?: string;
    usedAt?: Date;
    expireAt?: Date;
}

