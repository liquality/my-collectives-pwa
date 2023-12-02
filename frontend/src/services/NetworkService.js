import { Auth } from "@/utils";
const serverAddress =
  import.meta.env.VITE_SERVER_PRODUCTION_URL || import.meta.env.VITE_SERVER_ADDRESS || "http://localhost:3000";

const NetworkService = {
  getResource: function (url) {
    var promise = new Promise((resolve, reject) => {
      let request = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
  getResourceWithAuth: function (url, jwt) {
    var promise = new Promise((resolve, reject) => {
      let request = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + jwt,
          "Content-Type": "application/json",
        },
      };

      if (Auth.isAuthenticated) {
        request.headers["Authorization"] = "Bearer " + Auth.accessToken;
      }
      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
  putResourceWithAuth: function (url, data, jwt) {
    var promise = new Promise((resolve, reject) => {
      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      if (Auth.isAuthenticated) {
        headers["Authorization"] = "Bearer " + Auth.accessToken;
      }

      let request = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      };

      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },

  postResourceWithAuth: function (url, data, jwt) {
    var promise = new Promise((resolve, reject) => {
      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (Auth.isAuthenticated) {
        headers["Authorization"] = "Bearer " + Auth.accessToken;
      }

      let request = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      };

      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },

  handleJsonResponse: function (response) {
    try {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        Auth.clearAccessToken();
      }

      return null;
    } catch (error) {
      return error;
    }
  },
  handleEmptyResponse: function (response) {
    var promise = new Promise((resolve, reject) => {
      if (response.ok) {
        resolve({});
      } else {
        reject({});
      }
    });
    return promise;
  },
  deleteResourceWithAuth: function (url, jwt) {
    var promise = new Promise((resolve, reject) => {
      var headers = {
        Accept: "application/json",
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      };

      if (jwt) {
        headers["Authorization"] = "Bearer " + jwt;
      }
      let request = {
        method: "DELETE",
        headers: headers,
        // body: JSON.stringify(data)
      };

      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
  deleteArrayResourceWithAuth: function (url, data, session) {
    var promise = new Promise((resolve, reject) => {
      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      if (session) {
        headers["x-session"] = session.guid;
      }
      let request = {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data),
      };
      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
};

export default NetworkService;
