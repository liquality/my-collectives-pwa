import { Router } from "express";
import { ChallengesController } from "../../controllers/v1/challenges";
import { authentication } from "../../middlewares";
export const challengesRouter = Router();
const challenge = new ChallengesController();

challengesRouter.post("", authentication, challenge.create);
challengesRouter.get("/creator", authentication, challenge.findAllByCreator);

challengesRouter.get("/:id", challenge.find);
challengesRouter.get("", challenge.findAll);



