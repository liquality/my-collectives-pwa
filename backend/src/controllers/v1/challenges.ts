import { RequestHandler } from "express";
import { AuthService } from "../../services/auth";
import { ChallengesService as ChallengesService } from "../../services/challenges";

export class ChallengesController {


    public findAll: RequestHandler = async (req, res) => {
        try {
            const challenges = await ChallengesService.findAll();

            res.status(200).send(challenges);
        } catch (err: any) {
            res.status(500).send({ error: err.message });
        }
    };

    public find: RequestHandler = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.status(400).send({ error: "id is required" });
        } else {
            try {
                const challenges = await ChallengesService.find(id);

                if (!challenges) {
                    res.status(404).send({ error: "Challenge not found" });
                } else {
                    res.status(200).send(challenges);
                }
            } catch (err: any) {
                res.status(500).send({ error: err.message });
            }
        }
    };

    public create: RequestHandler = async (req, res) => {
        const user = await AuthService.find((req as any).auth?.sub);
        try {
            if (user.id) {
                const challenge = await ChallengesService.create(
                    req.body,
                    user.id
                );
                if (!challenge) {
                    throw new Error("Challenge not created");
                }
                res.status(200).send(challenge);

            }
            else {
                res.status(401).send({ error: "Could not authenticate for creating challenges" });
            }


        } catch (err: any) {
            res.status(500).send({ error: err.message });
        }
    }

    public findAllByCreator: RequestHandler = async (req, res) => {
        const user = await AuthService.find((req as any).auth?.sub);
        try {
            if (user.id) {
                const challenges = await ChallengesService.findAllByCreator(user.id);
                console.log(challenges, 'challenges by creator')

                if (!challenges) {
                    throw new Error("Could not find challenges by creator");
                }
                res.status(200).send(challenges);
            }
            else {

                res.status(401).send({ error: "Could not authenticate for creating challenges" });
            }


        } catch (err: any) {
            console.log(err, ' error challenges by creator')

            res.status(500).send({ error: err.message });
        }
    }
};

