import { RequestHandler } from "express";
import { ChatService } from "../../services/chat";
import { AuthService } from "../../services/auth";
import { io } from "../../io";

export class ChatController {
  public createMessage: RequestHandler = async (req, res) => {
    const { groupId, content } = req.body;
    const user = await AuthService.find((req as any).auth?.sub);
    try {
      const message = await ChatService.createMessage(
        { groupId, content },
        user.id
      );

      io.emit("messageCreation", message);
      res.status(200).send(message);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "An error occurred" });
    }
  };

  public findMessages: RequestHandler = async (req, res) => {
    try {
      const { groupId } = req.params;
      const messages = await ChatService.findByGroup(groupId);

      res.status(200).send(messages);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "An error occurred" });
    }
  };
}
