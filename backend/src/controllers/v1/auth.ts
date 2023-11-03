import { RequestHandler } from "express";
import { AuthService } from "../../services/auth";

export class AuthController {
  public login: RequestHandler = async (req, res) => {
    const { publicAddress, signature } = req.body;

    try {
      if (!publicAddress || !signature) {
        res
          .status(400)
          .send({ error: "public address and signature are required" });
      } else {
        const accessToken = await AuthService.loginWithPublicAddress(
          publicAddress,
          signature
        );
        if (accessToken) {
          res.status(200).send({ accessToken });
        } else {
          res.status(401).send();
        }
      }
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  };

  public getNonce: RequestHandler = async (req, res) => {
    const { address } = req.params;
    if (!address) {
      res.status(400).send({ error: "address is required" });
    }
    try {
      const account = await AuthService.getNonce(address);
      if (account) {
        res.status(200).send(account);
      } else {
        res
          .status(404)
          .send({ error: `Account not found for address: ${address}` });
      }
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  };

  public createUser: RequestHandler = async (req, res) => {
    const { publicAddress } = req.body;

    if (!publicAddress) {
      res.status(400).send({ error: "public address is required" });
    } else {
      try {
        const account = await AuthService.createUser({ publicAddress });
        if (account) {
          res.status(200).send(account);
        } else {
          res.status(400).send({
            error: `Cannot create the account for the address: ${publicAddress}`,
          });
        }
      } catch (err: any) {
        res.status(400).send({ error: err.message });
      }
    }
  };
}
