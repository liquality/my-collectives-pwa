import { Server as WSServer } from "socket.io";
import http from "http";
export let io: WSServer;

export const initialize = (server: http.Server) => {
  io = new WSServer(server, {
    cors: {
      origin: process.env.PROD_CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });



  //Dummy auth as we dont have it yet
  io.use((socket: any, next) => {
    socket.user = "dummy-user-id";
    next();
  });

  io.on("connect", (socket: any) => {
    console.log(`User connected: ${socket.user}`);
    // You can access user data as socket.user
  });

  io.on("connection", (socket: any) => {
    console.log(`User connected: ${socket.user}`);
    // You can access user data as socket.user
  });
};
