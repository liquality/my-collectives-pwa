import authHandler from "./handlers/authHandler";
import messageHandler from "./handlers/messageHandler";
import middleware from "./middleware";
import groupHandler from "./handlers/groupHandler";
import inviteHandler from "./handlers/inviteHandler";
import { Express, Request, Response } from "express"; // Import Express types
import memberHandler from "./handlers/memberHandler";
import poolHandler from "./handlers/poolHandler";
import moralisHandler from "./handlers/moralisHandler";

type Endpoint = {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  middleware: any[]; // You should replace 'any[]' with a more specific type for middleware
  handler: (req: Request, res: Response) => void;
  description: string;
};

const endpoints: Record<string, Endpoint> = {}; // Define the endpoints object

// Define and populate the endpoints
endpoints.loginUser = {
  url: "/v1/user/login/:serviceProviderNname",
  method: "post",
  middleware: [],
  handler: authHandler.loginUser,
  description: "login user",
};

endpoints.getUser = {
  url: "/v1/user/:publicAddress",
  method: "get",
  middleware: [],
  handler: authHandler.read,
  description: "login user",
};

// Message endpoints
endpoints.createMessage = {
  url: "/v1/message",
  method: "post",
  middleware: [],
  handler: messageHandler.create,
  description: "create msg",
};

endpoints.createGroup = {
  url: "/v1/group",
  method: "post",
  middleware: [],
  handler: groupHandler.create,
  description: "create group",
};

endpoints.readGroup = {
  url: "/v1/group/:groupId",
  method: "get",
  middleware: [],
  handler: groupHandler.read,
  description: "read group by userid/public address",
};

endpoints.createInvite = {
  url: "/v1/invite",
  method: "post",
  middleware: [],
  handler: inviteHandler.create,
  description: "create invite",
};

endpoints.readInvite = {
  url: "/v1/invite/:inviteLink",
  method: "get",
  middleware: [],
  handler: inviteHandler.read,
  description: "read invite by invite link",
};

endpoints.readMessageByGroupId = {
  url: "/v1/message/:groupId",
  method: "get",
  middleware: [],
  handler: messageHandler.readMessageByGroupId,
  description: "read messages by groupid",
};


endpoints.createMember = {
  url: "/v1/member",
  method: "post",
  middleware: [],
  handler: memberHandler.create,
  description: "create member",
};



endpoints.readAllGroupsForMember = {
  url: "/v1/member/:senderAddress",
  method: "get",
  middleware: [],
  handler: memberHandler.readAllGroupsForMember,
  description: "get all groups member is a part of",
};

endpoints.getNumberOfGroupMembers = {
  url: "/v1/members/:groupAddress",
  method: "get",
  middleware: [],
  handler: memberHandler.getNumberOfGroupMembers,
  description: "get the number of members in specififed group",
};

endpoints.createPool = {
  url: "/v1/pool",
  method: "post",
  middleware: [],
  handler: poolHandler.create,
  description: "create pool",
};

endpoints.readPools = {
  url: "/v1/pools",
  method: "get",
  middleware: [],
  handler: poolHandler.read,
  description: "read all pools for discover",
}



endpoints.readAllPoolsForGroup = {
  url: "/v1/pool/:groupId",
  method: "get",
  middleware: [],
  handler: poolHandler.readAllPoolsForGroup,
  description: "get all pools by groupid",
};

/* MORALIS ENDPOINTS */
endpoints.getTokenMetadata = {
  url: "/v1/moralis/tokenmetadata",
  method: "get",
  middleware: [],
  handler: moralisHandler.getTokenMetadata,
  description: "get tokenmetadata given an array of token contracts and ids",
};

endpoints.getLeaderboard = {
  url: "/v1/moralis/leaderboard/:tokenId/:contractAddress",
  method: "get",
  middleware: [],
  handler: moralisHandler.getLeaderboard,
  description: "get leaderboard of certain tokenid and mint nft contract address",
};


/* SOUND/ZORA ENDPOINTS  */

endpoints.getLeaderboardForSound = {
  url: "/v1/sound/leaderboard/:contractAddress",
  method: "get",
  middleware: [],
  handler: moralisHandler.getLeaderboardForSound,
  description: "get leaderboard of mint nft contract address using Sound API",
};

endpoints.getLeaderboardForZora = {
  url: "/v1/zora/leaderboard/:contractAddress",
  method: "get",
  middleware: [],
  handler: moralisHandler.getLeaderboardForZora,
  description: "get leaderboard of certain tokenid and mint nft contract address using zora contract address",
};








export default endpoints;
