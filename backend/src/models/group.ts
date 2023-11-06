export interface Group {
  id: string;
  name: string;
  description?: string;
  publicAddress: string;
  rewards: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
  publicAddress: string;
}