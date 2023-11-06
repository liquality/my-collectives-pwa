import { Router } from "express";
import { authentication } from "../../middlewares";
import { InviteController } from "../../controllers/v1/invite";
export const inviteRouter = Router();
const ctrl = new InviteController();


inviteRouter.get("/:id/claim", ctrl.claim);
inviteRouter.get("/:id", ctrl.find);
inviteRouter.post("/", authentication, ctrl.create);
