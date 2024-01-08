import { Router } from "express";
import { GroupsController } from "../../controllers/v1/groups";
import { authentication } from "../../middlewares";
export const groupsRouter = Router();
const ctrl = new GroupsController();

groupsRouter.post("/", authentication, ctrl.create);
groupsRouter.get("/address/:address", authentication, ctrl.findByUserAddress);
groupsRouter.get("/challenge/:challengeId", authentication, ctrl.findByChallenge);
groupsRouter.get("/:id/members", authentication, ctrl.findMembers);
groupsRouter.get("/:id", authentication, ctrl.find);
groupsRouter.put("/:id", authentication, ctrl.update);
groupsRouter.put("/toggle/:groupId/:userId", authentication, ctrl.toggleAdminStatus);

