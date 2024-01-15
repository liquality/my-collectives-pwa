import { RequestHandler } from "express";
import { AuthService } from "../../services/auth";
import { PoolsService } from "../../services/pools";

export class PoolsController {
  public findByGroup: RequestHandler = async (req, res) => {
    const { groupId } = req.params;

    if (!groupId) {
      res.status(400).send({ error: "the group id is required" });
    } else {
      try {
        const pools = await PoolsService.findByGroup(groupId);

        res.status(200).send(pools);
      } catch (err: any) {
        console.log(err, 'error')
        res.status(500).send({ error: err.message });
      }
    }
  };

  public findAll: RequestHandler = async (req, res) => {
    try {
      const pools = await PoolsService.findAllPoolsThatAreExpired();

      res.status(200).send(pools);
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
        const pool = await PoolsService.find(id);

        if (!pool) {
          res.status(404).send({ error: "Pool not found" });
        } else {
          res.status(200).send(pool);
        }
      } catch (err: any) {
        res.status(500).send({ error: err.message });
      }
    }
  };

  public create: RequestHandler = async (req, res) => {
    const { groupId, mintingContractAddress, chainId, tokenId } = req.body;
    const user = await AuthService.find((req as any).auth?.sub);
    if (!groupId || !mintingContractAddress || !chainId || !tokenId) {
      res.status(400).send({ error: "please provide all required fields" });
    } else {
      try {
        const pool = await PoolsService.create(
          { groupId, mintingContractAddress, chainId, tokenId },
          user.id
        );

        if (!pool) {
          throw new Error("Pool not created");
        }
        res.status(200).send(pool);
      } catch (err: any) {
        res.status(500).send({ error: err.message });
      }
    }
  };
}
