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
    publicAddress: string
}

export interface Invite {
    id: number;
    group_id: number;
    invite_link: string;
    is_used: boolean;
    expire_date: string;
}

