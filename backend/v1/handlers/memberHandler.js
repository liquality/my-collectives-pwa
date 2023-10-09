"use strict";

var User = require("../classes/User");
var ApiError = require("../classes/ApiError");
const Member = require("../classes/Member");

var memberHandler = {};

memberHandler.create = function (req, res) {
  var member = new Member();
  member.set(req.body); // should be a member object

  member.create().then(
    (result) => {
      res.status(200).send(result);
    },
    (reject) => {
      res.status(400).send(new ApiError(400, reject));
    }
  );
};

memberHandler.read = function (req, res) {

  var member = new Member();
  member.read(req.body.status).then(
    (members) => {
      res.status(200).send(members);
    },
    (reason) => {
      res.status(400).send(new ApiError(400, reason));
    }
  );
};

memberHandler.update = function (req, res) {
  var member = new Member();
  member.update(req.body.memberIds, req.body.isAcceptance).then(
    (status) => {
      res.status(200).send(status);
    },
    (reject) => {
      res.status(400).send(new ApiError(400, reject));
    }
  );
};


module.exports = memberHandler;
