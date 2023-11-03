import { Router } from "express";
import { NFTController } from "../../controllers/v1/nft";
export const nftRouter = Router();
const ctrl = new NFTController();

nftRouter.get("/leaderboard/:contractAddress/:tokenId", ctrl.getLeaderboard);
nftRouter.get("/meta", ctrl.getTokenMetadata);
