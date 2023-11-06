import { Router } from "express";
import { PoolsController } from "../../controllers/v1/pools";
import { authentication } from "../../middlewares";
export const poolsRouter = Router();
const pool = new PoolsController();

poolsRouter.post("", authentication, pool.create);
poolsRouter.post("/:id", pool.find);
poolsRouter.get("", pool.findAll);
poolsRouter.get("/group/:groupId", authentication, pool.findByGroup);
