import { Router } from "express";
import { GroupsController } from "../../controllers/v1/groups";
import { authentication } from "../../middlewares";
export const groupsRouter = Router();
const ctrl = new GroupsController();

groupsRouter.post("/", authentication, ctrl.create);
groupsRouter.get("/address/:address", authentication, ctrl.findByUserAddress);
groupsRouter.get("/:id/members", authentication, ctrl.findMembers);
groupsRouter.get("/:id", authentication, ctrl.find);
