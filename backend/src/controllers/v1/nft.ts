import { RequestHandler } from "express";
import { NFTService } from "../../services/nft";

export class NFTController {
  public getTokenMetadata: RequestHandler = async (req, res) => {
    try {
      const meta = await NFTService.getTokenMetadata();

      res.status(200).send(meta);
    } catch (err) {
      console.error(err, "Error in moralis handler");
      res.status(500).send({ error: "An error occurred" });
    }
  };

  public getLeaderboard: RequestHandler = async (req, res) => {
    try {
      const { contractAddress, tokenId } = req.params;
      const leaderboard = await NFTService.getLeaderboard(
        contractAddress,
        tokenId
      );

      res.status(200).send(leaderboard);
    } catch (err) {
      console.error(err, "Error in moralis handler");
      res.status(500).send({ error: "An error occurred" });
    }
  };
}
