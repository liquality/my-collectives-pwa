import { Request, Response } from "express";
import User from "../classes/Auth";
import ApiError from "../classes/ApiError";

const authHandler = {
  read: async (req: Request, res: Response) => {
    const address = req.params.publicAddress;
    
    if (address) {
      const user = new User();
      try {
        const userData = await user.findOrCreate(address);
        if (userData) {
          res.status(200).send(userData);
        } else {
          res
            .status(403)
            .send(new ApiError(403, "Access denied, userid does not match"));
        }
      } catch (reason: any) {
        res.status(400).send(new ApiError(400, reason));
      }
    } else {
      res.status(400).send(new ApiError(400, "Address is required"));
    }
  },

  create: async (req: Request, res: Response) => {
    const {
      email,
      first_name,
      last_name,
      public_address,
      service_provider_name,
    } = req.body;
    const user = new User();

    try {
      const result = await user.createUser({
        email,
        first_name,
        last_name,
        public_address,
        service_provider_name,
      });
      if (result) {
        res.status(200).send(result);
      }

      res.status(400).send(new ApiError(400, "Error Creating User"));
    } catch (err: any) {
      res.status(400).send(new ApiError(400, err.message));
    }
  },

  delete: async (req: Request, res: Response) => {
    /*    const id = req.params.id;
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
    const { serviceProviderNname } = req.params;
    const { publicAddress, signature } = req.body;

  console.log(publicAddress, signature, serviceProviderNname, 'loginUser')
    const user = new User();

    try {
      const accessToken = await user.authenticatePublicAddress(
        publicAddress,
        signature
      );
      if (accessToken) {
        res.status(200).send({ accessToken });
      }

      res.status(401).send();
    } catch (err: any) {
      res.status(400).send(new ApiError(400, err.message));
    }
  },
};

export default authHandler;
