import { Server as WSServer } from "socket.io";
import http from "http";
export let io: WSServer;

export const initialize = (server: http.Server) => {
  io = new WSServer(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  //TODO: use this function when we have auth flow enabled
  /* io.use((socket, next) => {
    //const token = socket.handshake.auth.token;
    if (middleware.authenticateJWTForWebsocket) {
      middleware.authenticateJWTForWebsocket(socket, (err) => {
        if (err) {
          console.log('No user auth')
          return next(err);
        }
        next();
      });
    }
  
  }); */

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
