import { Request, Response } from "express";
import User from "../classes/Auth";
import ApiError from "../classes/ApiError";
import Pool from "../classes/Pool";
import helper from "../helper";
import { getTokenMetadataFromZora } from "./zoraHelper";


const poolHandler = {
    create: async (req: Request, res: Response) => {
        const pool = new Pool();
        pool.set(req.body);
        try {
            const result = await pool.create(req.body);
            res.status(200).send(result);
        } catch (err) {
            console.log(err, 'error?')
            res.status(400).send(new ApiError(400, 'Error' + err));
        }
    },

    read: async (req: Request, res: Response) => {
        const pool = new Pool();
        try {
            const result = await pool.read();
            if (result) {
                const nftResult = await getTokenMetadataFromZora(result)
                res.status(200).send(nftResult)
            }
            else {
                res.status(400).send(new ApiError(400, 'Error' + "No pool result"));
            }

        } catch (err) {
            console.log(err, 'error?')
            res.status(400).send(new ApiError(400, 'Error' + err));
        }
    },

    readAllPoolsForGroup: async (req: Request, res: Response) => {
        const groupId = req.params.groupId;

        if (groupId) {
            if (groupId == groupId) {
                const pool = new Pool();
                try {
                    const allPools = await pool.readAllPoolsForGroup(groupId);
                    res.status(200).send(allPools);
                } catch (err) {
                    res.status(400).send(new ApiError(400, 'Error' + err));
                }
            } else {
                res.status(403).send(new ApiError(403, "Access denied, userid does not match"));
            }
        }
    },




    delete: async (req: Request, res: Response) => {
        /*     const id = req.params.id;
            const userId = req.apiSession.userid;
    
            if (id == userId) {
                const user = new User();
                try {
                    const userData = await user.read(id);
                    await user.delete();
    
                    res.status(200).send({});
                } catch (reject) {
                    res.status(400).send(new ApiError(400, reject));
                }
            } else {
                res.status(403).send(new ApiError(403, "Access denied"));
            } */
    },

};

export default poolHandler;
