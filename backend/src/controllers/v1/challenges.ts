import { RequestHandler } from "express";
import { AuthService } from "../../services/auth";
import { ChallengesService as ChallengesService } from "../../services/challenges";

export class ChallengesController {


    public findAll: RequestHandler = async (req, res) => {
        try {
            const challenges = await ChallengesService.findAll();
            //console.log(challenges, 'all the challenges')

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
        //const user = await AuthService.find((req as any).auth?.sub);

        //TODO: add back auth (it did not work)
        try {
            const challenge = await ChallengesService.create(
                req.body,
                //user.id
            );

            if (!challenge) {
                throw new Error("Challenge not created");
            }
            res.status(200).send(challenge);
        } catch (err: any) {
            res.status(500).send({ error: err.message });
        }
    }
};

