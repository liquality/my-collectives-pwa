import express, { json, urlencoded } from "express";
import cors from "cors";
import Moralis from "moralis";
import dotenv from "dotenv";
import { initialize as initializeWs } from "./io";
import { v1Router } from "./routes/v1";

dotenv.config();
const app = express();
const appPort = process.env.PORT || 3000;

app.use(cors(), json({ limit: "5mb" }), urlencoded({ extended: true }));

// routing
app.use("/v1", v1Router);

console.log(
  `\n\nIF THIS THROWS AN ERROR -\nMAKE SURE YOU ARE ALLOWED TO OPEN PORT ${appPort}\n\n`
);
const server = app.listen(appPort);
initializeWs(server);

const startMoralisSdk = () => {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
};

startMoralisSdk();
