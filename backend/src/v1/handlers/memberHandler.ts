import { Request, Response } from "express";
import User from "../classes/Auth";
import ApiError from "../classes/ApiError";
import Member from "../classes/Member";

const memberHandler = {
    create: async (req: Request, res: Response) => {
        console.log(req.body, 'wats member body?')

        const member = new Member();
        member.set(req.body); // should be a user object

        try {
            const result = await member.create();
            res.status(200).send(result);
        } catch (err) {

            res.status(400).send(new ApiError(400, 'Error' + err));
        }
    },

    getNumberOfGroupMembers: async (req: Request, res: Response) => {
        const member = new Member();
        const groupAddress = req.params.groupAddress;
        try {
            const result = await member.getNumberOfGroupMembers(groupAddress);
            console.log('result')
            res.status(200).send(result);
        } catch (err) {
            console.log(err)
            res.status(400).send(new ApiError(400, 'Error' + err));
        }
    },


    readAllGroupsForMember: async (req: Request, res: Response) => {
        const senderAddress = req.params.senderAddress;
        if (senderAddress) {
            if (senderAddress == senderAddress) {
                const member = new Member();
                try {
                    const allGroups = await member.readAllGroupsForMember(senderAddress);
                    console.log(allGroups, 'allgroups')
                    res.status(200).send(allGroups);
                } catch (err) {
                    res.status(400).send(new ApiError(400, 'Error' + err));
                }
            } else {
                res.status(403).send(new ApiError(403, "Access denied, userid does not match"));
            }
        }
    },


    read: async (req: Request, res: Response) => {
        const invite_link = req.params.inviteLink;

        if (invite_link) {
            if (invite_link == invite_link) {
                const invite = new Member();
                try {
                    const inv = await invite.read(invite_link);
                    res.status(200).send(inv);
                } catch (err) {
                    res.status(400).send(new ApiError(400, 'Error' + err));
                }
            } else {
                res.status(403).send(new ApiError(403, "Access denied, userid does not match"));
            }
        }
    },



    update: async (req: Request, res: Response) => {
        /*         const user = new User();
                user.set(req.body);
                const userId = Number(req.user.id);
        
                if (userId == Number(req.params.id)) {
                    try {
                        const updatedUser = await user.update(userId);
                        res.status(200).send(updatedUser);
                    } catch (err) {
                        res.status(400).send(new ApiError(400, 'Error' + err));
                    }
                } else {
                    res.status(403).send(new ApiError(403, "Access denied"));
                } */
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

    loginUser: async (req: Request, res: Response) => {
        /*      const serviceprovider_name = req.params.serviceprovider_name;
             const user = new User();
     
             try {
                 const result = await user.loginUser(serviceprovider_name);
                 res.status(200).send(result);
             } catch (reason) {
                 res.status(400).send(new ApiError(400, reason));
             } */
    },
};

export default memberHandler;
