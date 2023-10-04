export interface Message {
    id?: number;
    sender: string;
    text: string;
    created_at?: string;
    group_id: number;
}

export interface Group {
    id?: number;
    group_name?: string;
    created_at?: string;
}

