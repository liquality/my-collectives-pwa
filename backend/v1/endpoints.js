var endpoints = {};
var userHandler = require("./handlers/userHandler");
var messageHandler = require("./handlers/messageHandler");

var middleware = require("./middleware");
const groupHandler = require("./handlers/groupHandler");
const inviteHandler = require("./handlers/inviteHandler");

endpoints.createUser = {
  url: "/v1/user",
  method: "post",
  middleware: [],
  handler: userHandler.create,
  description: "create user",
};
endpoints.readUser = {
  url: "/v1/user/:id",
  method: "get",
  middleware: [middleware.authenticateJWT],
  handler: userHandler.read,
  description: "create user",
};

endpoints.loginUser = {
  url: "/v1/user/login/:serviceprovider_name",
  method: "get",
  middleware: [],
  handler: userHandler.loginUser,
  description: "login user",
};

endpoints.updateUser = {
  url: "/v1/user/:id",
  method: "put",
  middleware: [middleware.authenticateJWT],
  handler: userHandler.update,
  description: "update user",
};

endpoints.deleteUser = {
  url: "/v1/user/:id",
  method: "delete",
  middleware: [middleware.authenticateJWT],
  handler: userHandler.delete,
  description: "delete user",
};
/*  */
//Game endpoints
/*  */
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
  url: "/v1/group/:id",
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

endpoints.readGame = {
  url: "/v1/game/:id",
  method: "get",
  middleware: [middleware.authenticateJWT],
  handler: messageHandler.read,
  description: "read game",
};

endpoints.readGameByUserId = {
  url: "/v1/games/:userid/:artistNumberId?",
  method: "get",
  middleware: [middleware.authenticateJWT],
  handler: messageHandler.readGamesByUserId,
  description: "read game by user id ",
};

endpoints.getLeaderboardData = {
  url: "/v1/game/leaderboard/:game_symbol_id",
  method: "get",
  middleware: [],
  handler: messageHandler.getLeaderboardData,
  description: "read leaderboard data based on game symbol id ",
};

endpoints.updateGame = {
  url: "/v1/game/:userid",
  method: "put",
  middleware: [middleware.authenticateJWT],
  handler: messageHandler.update,
  description: "update game",
};

endpoints.deleteGame = {
  url: "/v1/game/:id",
  method: "delete",
  middleware: [],
  handler: messageHandler.delete,
  description: "delete game",
};

/*WEBHOOK EVENTS FROM CROSSMINT*/

endpoints.listenToWebhook = {
  url: "/v1/webhook",
  method: "post",
  middleware: [],
  handler: messageHandler.webhook,
  description: "listen to crossmint webhook",
};

module.exports = endpoints;
