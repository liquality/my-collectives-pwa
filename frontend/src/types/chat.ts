export interface Message {
    id?: number;
    sender: string;
    text: string;
    created_at?: string;
    group_id: number;
}

export interface Group {
    id: number;
    group_name?: string;
    created_at?: string;
    number_of_members?: number,
    rewards?: number;
    public_address: string
}

export interface GroupCreation {
    group_name?: string;
    public_address: string
}

export interface Invite {
    id: number;
    group_id: number;
    invite_link: string;
    is_used: boolean;
    expire_date: string;
}

