export interface Invite {
  id: string;
  groupId: string;
  code?: string;
  usedAt?: Date;
  expireAt?: Date;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
}

export interface InviteCreateRequest {
  groupId: string;
  expireAt?: Date;
}
