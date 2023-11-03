import { dbClient } from "../data";
import { Message, CreateMessageRequest } from "../models/message";

export class ChatService {
  public static async createMessage(
    data: CreateMessageRequest,
    userId: string
  ): Promise<Message | null> {
    // TODO: validate if the user can add a message to the group
    const result = await dbClient("messages").insert(
      {
        ...data,
        userId: userId,
      },
      ["id", "groupId", "userId", "content", "createdAt"]
    );
    if (result.length > 0) {
      return result[0];
    }

    return null;
  }

  public static async findByGroup(groupId: string): Promise<Message[]> {
    return dbClient("messages")
      .where("groupId", "=", groupId)
      .join("users", "users.id", "=", "messages.userId")
      .select<Message[]>("messages.id", "messages.groupId", "messages.userId", "messages.content", "messages.createdAt","users.publicAddress as userAddress");
  }
}
