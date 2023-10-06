"use strict";

var Message = require("../classes/Message");
var ApiError = require("../classes/ApiError");
const { helperFindArtistNumberIdByTokenId } = require("../helper");
const websocketService = require("../services/WebsocketService");

var messageHandler = {};

messageHandler.create = function (req, res) {
  var message = new Message();
  message.set(req.body); // should be a game object

  message.create().then(
    (msg) => {
      //TODO: replace with userid/address
      websocketService.send([2], "crossmint_success", msg);

      res.status(200).send(msg);
    },
    (reject) => {
      res.status(400).send(new ApiError(400, reject));
    }
  );
};

messageHandler.read = function (req, res) {
  var id = req.params.id;
  //var userid = req.apiSession.userid;

  if (id) {
    if (id == id) {
      var game = new Message();
      game.read(id).then(
        (game) => {
          res.status(200).send(game);
        },
        (reason) => {
          res.status(400).send(new ApiError(400, reason));
        }
      );
    } else {
      res
        .status(403)
        .send(new ApiError(403, "Access denied, gameid does not match"));
    }
  }
};

messageHandler.readMessageByGroupId = function (req, res) {
  const groupId = req.params.groupId;

  if (groupId) {
    var message = new Message();
    message.readMessageByGroupId(groupId).then(
      (msgs) => {
        res.status(200).send(msgs);
      },
      (reason) => {
        res.status(400).send(new ApiError(400, reason));
      }
    );
  } else {
    res
      .status(403)
      .send(new ApiError(403, "Access denied, group_id does not match"));
  }
};

messageHandler.update = function (req, res) {
  var game = new Message();
  game.set(req.body);
  const userid = Number(req.params.userid);
  //const userIdFromSession = req.user.id;
  if (userid) {
    game.update().then(
      (game) => {
        res.status(200).send(game);
      },
      (reject) => {
        res.status(400).send(new ApiError(400, reject));
      }
    );
  } else {
    res.status(403).send(new ApiError(403, "Access denied, update"));
  }
};

messageHandler.delete = function (req, res) {
  var id = req.params.id;
  //var userid = req.apiSession.userid;
  if (id == id) {
    var game = new Message();
    game.read(id).then(
      (game) => {
        game.delete().then(
          (result) => {
            res.status(200).send({});
          },
          (reject) => {
            res.status(400).send(new ApiError(400, reject));
          }
        );
      },
      (reason) => {
        res.status(400).send(new ApiError(400, reason));
      }
    );
  } else {
    res.status(403).send(new ApiError(403, "Access denied for delete game"));
  }
};

messageHandler.webhook = async function (req, res) {
  const { status, tokenIds, passThroughArgs, walletAddress, txId } = req.body;
  const argsDeserialized = JSON.parse(passThroughArgs);
  const argsDeseralisedSecond = JSON.parse(argsDeserialized);
  const argsDeseralisedThird = JSON.parse(argsDeseralisedSecond);

  const userId = argsDeseralisedThird.id;
  if (status === "success") {
    websocketService.send([userId], "crossmint_success", {
      tokenId: tokenIds,
      status,
      walletAddress,
      txId,
    });

    res.status(200).send({});
  } else {
    res.status(400).send(new ApiError(400, reason));
  }
};

module.exports = messageHandler;
