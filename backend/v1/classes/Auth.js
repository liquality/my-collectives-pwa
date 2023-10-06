const MySQL = require("../../MySQL");
const ApiError = require("./ApiError");
const jwt = require("jsonwebtoken");

class Auth {
  constructor(auth) {
    this.set(auth);
  }

  set(auth) {
    if (typeof auth !== "undefined") {
      this.id = auth.id;
      this.serviceprovider_name = auth.serviceprovider_name;
    }
  }

  async authenticateUser(publicAddress) {
    return new Promise((resolve, reject) => {});
  }
}

module.exports = Auth;
