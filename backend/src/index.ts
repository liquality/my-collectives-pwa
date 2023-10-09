import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import { expressjwt as jwt } from "express-jwt";
import v1 from "./v1/";

// TODO: Store a better secret in a hidden config file
const secret = process.env.JWT_SECRET || "my-secret";

const app = express();
const appPort = process.env.PORT || 6000;

const jwtMiddleware = jwt({
  secret: secret,
  algorithms: ["HS256"],
}).unless({ path: ["/v1/user", "/v1/user/login"], method: ["POST", "GET"] });

app.use(
  cors(),
  json({ limit: "5mb" }),
  jwtMiddleware,
  urlencoded({ extended: true }),
  v1
);

// Requires access to lower ports
console.log(
  "\n\nIF THIS THROWS AN ERROR -\nMAKE SURE YOU ARE ALLOWED TO OPEN PORT 6000!\n\n"
);
const server = app.listen(appPort);

/* addConnectionListener(server); */

/* const io = new Server(server, {
  origin: "http://localhost:5173",
  methods: ["POST", "GET"],
}); */
