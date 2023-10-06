"use strict";

var User = require("../classes/Auth");
var ApiError = require("../classes/ApiError");
const Group = require("../classes/Group");

var groupHandler = {};

groupHandler.create = function (req, res) {
  var group = new Group();
  group.set(req.body); // should be a user object

  group.create().then(
    (result) => {
      res.status(200).send(result);
    },
    (reject) => {
      res.status(400).send(new ApiError(400, reject));
    }
  );
};

groupHandler.read = function (req, res) {
  var id = req.params.id;
  if (id) {
    if (id == id) {
      var group = new Group();
      group.read(id).then(
        (user) => {
          res.status(200).send(user);
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

groupHandler.update = function (req, res) {
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

groupHandler.delete = function (req, res) {
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

groupHandler.loginUser = function (req, res) {
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

module.exports = groupHandler;
