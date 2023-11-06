export interface Message {
  id: number;
  userId: string;
  content: string;
  groupId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateMessageRequest {
  content: string;
  groupId: number;
}