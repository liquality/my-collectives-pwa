export interface Message {
    id?: number;
    userId: string;
    userAddress: string;
    content: string;
    createdAt?: string;
    groupId: string;
}

export interface Group {
    id: string;
    name?: string;
    createdAt?: string;
    members?: number,
    rewards?: number;
    publicAddress: string
}

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

