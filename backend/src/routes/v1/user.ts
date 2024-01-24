import { Router } from "express";
import { UserController } from "../../controllers/v1/user";
import { authentication } from "../../middlewares";
export const userRouter = Router();
const ctrl = new UserController();

userRouter.get("/rewards-summary", authentication, ctrl.getRewardsSummary);
userRouter.post("/save-claimed-rewards", authentication, ctrl.saveClaimedRewards);
userRouter.get("/mints", authentication, ctrl.getMints);
