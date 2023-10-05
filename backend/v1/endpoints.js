var endpoints = {};
var userHandler = require("./handlers/userHandler");
var messageHandler = require("./handlers/messageHandler");

var middleware = require("./middleware");
const groupHandler = require("./handlers/groupHandler");
const inviteHandler = require("./handlers/inviteHandler");

endpoints.loginUser = {
  url: "/v1/user/login/:serviceprovider_name",
  method: "get",
  middleware: [],
  handler: userHandler.loginUser,
  description: "login user",
};

/*  */
//Message endpoints
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

endpoints.readMessageByGroupId = {
  url: "/v1/message/:groupId",
  method: "get",
  middleware: [],
  handler: messageHandler.readMessageByGroupId,
  description: "read messages by groupid",
};

endpoints.readMessage = {
  url: "/v1/game/:id",
  method: "get",
  middleware: [middleware.authenticateJWT],
  handler: messageHandler.read,
  description: "read game",
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
