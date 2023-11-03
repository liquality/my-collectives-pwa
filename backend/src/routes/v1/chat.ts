import { Router } from "express";
import { ChatController } from "../../controllers/v1/chat";
import { authentication } from "../../middlewares";
export const chatRouter = Router();
const ctrl = new ChatController();

chatRouter.get("/:groupId", authentication, ctrl.findMessages);
chatRouter.post("/message", authentication, ctrl.createMessage);
