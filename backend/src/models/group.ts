export interface Group {
  id: string;
  memberCount?: number;
  poolsCount?: number;
  messagesCount?: number;
  activePoolsCount?: number;
  name: string;
  description?: string;
  publicAddress: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  loggedInUserIsAdmin?: boolean
}

export interface GroupAllInfo {
  poolsCount: number
  membersCount: number
  id: string;
  name: string;
  description?: string;
  publicAddress: string;
  createdAt?: Date;
  updatedAt?: Date;

}

export interface CreateGroupRequest {
  name: string;
  description?: string;
  publicAddress: string;
}