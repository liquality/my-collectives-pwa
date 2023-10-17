import { Request, Response } from "express";
import User from "../classes/Auth";
import ApiError from "../classes/ApiError";
import Group from "../classes/Group";
import { Socket } from "socket.io";
import io from "../../index" // Import the socket instance


const groupHandler = {
  create: async (req: Request, res: Response) => {
    const group = new Group();
    group.set(req.body); // should be a user object

    try {
      const result = await group.create();
      io.emit("groupCreation", "EMITTED CREATION EVENT");

      res.status(200).send(result);
    } catch (err) {
      //console.log(err, 'creating group error')

      //res.status(400).send(new ApiError(400, reject));
    }
  },

  read: async (req: Request, res: Response) => {
    const id = Number(req.params.groupId);
    console.log(id, 'wats id in req?', req.params.groupId)
    if (id) {
      const group = new Group();
      try {
        const user = await group.read(id);
        res.status(200).send(user);
      } catch (err) {
        console.log(err, 'Reading group error')
        //res.status(400).send(new ApiError(400, err));
      }
    }
  }


};

export default groupHandler;
