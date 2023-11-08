import { Router } from "express";
import { authRouter } from "./auth";
import { groupsRouter } from "./groups";
import { poolsRouter } from "./pools";
import { nftRouter } from "./nft";
import { chatRouter } from "./chat";
import { inviteRouter } from "./invite";
import { challengesRouter } from "./challenges";
export const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/groups", groupsRouter);
v1Router.use("/challenges", challengesRouter);

v1Router.use("/pools", poolsRouter);
v1Router.use("/nft", nftRouter);
v1Router.use("/chat", chatRouter);
v1Router.use("/invites", inviteRouter); 
