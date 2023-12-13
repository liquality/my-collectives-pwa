import { Router } from "express";
import { ChallengesController } from "../../controllers/v1/challenges";
import { authentication } from "../../middlewares";
export const challengesRouter = Router();
const challenge = new ChallengesController();

challengesRouter.post("", authentication, challenge.create);
challengesRouter.post("/:id", challenge.find);
challengesRouter.get("", challenge.findAll);


