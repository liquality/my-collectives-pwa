"use strict";

var User = require("../classes/User");
var ApiError = require("../classes/ApiError");
const Invite = require("../classes/Invite");

var inviteHandler = {};

inviteHandler.create = function (req, res) {
  var invite = new Invite();
  console.log(req.body, "req body?", invite);
  invite.set(req.body); // should be a user object

  invite.create().then(
    (result) => {
      res.status(200).send(result);
    },
    (reject) => {
      console.log(reject, "why reject?");
      res.status(400).send(new ApiError(400, reject));
    }
  );
};

inviteHandler.read = function (req, res) {
  const invite_link = req.params.inviteLink;
  console.log("INSIDE INVITE LINK READ", req.params);

  if (invite_link) {
    if (invite_link == invite_link) {
      var invite = new Invite();
      invite.read(invite_link).then(
        (inv) => {
          res.status(200).send(inv);
        },
        (reason) => {
          res.status(400).send(new ApiError(400, reason));
        }
      );
    } else {
      res
        .status(403)
        .send(new ApiError(403, "Access denied, userid does not match"));
    }
  }
};

inviteHandler.update = function (req, res) {
  var user = new User();
  user.set(req.body);
  var userid = Number(req.user.id);
  if (userid == Number(req.params.id)) {
    user.update(userid).then(
      (user) => {
        res.status(200).send(user);
      },
      (reject) => {
        res.status(400).send(new ApiError(400, reject));
      }
    );
  } else {
    res.status(403).send(new ApiError(403, "Access denied"));
  }
};

inviteHandler.delete = function (req, res) {
  var id = req.params.id;
  var userid = req.apiSession.userid;
  if (id == userid) {
    var user = new User();
    user.read(id).then(
      (user) => {
        user.delete().then(
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
    res.status(403).send(new ApiError(403, "Access denied"));
  }
};

inviteHandler.loginUser = function (req, res) {
  var serviceprovider_name = req.params.serviceprovider_name;
  var user = new User();
  user.loginUser(serviceprovider_name).then(
    (result) => {
      res.status(200).send(result);
    },
    (reason) => {
      res.status(400).send(new ApiError(400, reason));
    }
  );
};

module.exports = inviteHandler;
