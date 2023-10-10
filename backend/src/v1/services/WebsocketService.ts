import WebSocket from "ws";
import User from "../classes/Auth";
import { Server as HttpServer, IncomingMessage } from "http";
import { Server as HttpsServer } from "https";

const wss = new WebSocket.Server({
  noServer: true,
  path: "/websockets",
});

interface Client {
  sockets: WebSocket[];
}

const clients: Record<string, Client> = {};

wss.on("connection", function connection(socket: WebSocket, request: IncomingMessage) {
  const userId = request.url?.split("?userid=")[1];
  console.log(clients, 'how many clients?', userId, request.url)


  if (!userId) {
    socket.close(401, "Unauthorized");
    return;
  }

  // Check if the socket is already in clients
  if (!clients[userId]) {
    clients[userId] = { sockets: [] };
  }

  // Check if the socket is not already added
  if (clients[userId].sockets.indexOf(socket) === -1) {
    clients[userId].sockets.push(socket);

    console.log("WebSocket connected!");

    socket.on("message", function message(msg: any) {
      // Handle WebSocket messages here
    });

    socket.on("close", function close() {
      console.log("WebSocket connection closed!");
      const socketIndex = clients[userId].sockets.indexOf(socket);
      if (socketIndex !== -1) {
        clients[userId].sockets.splice(socketIndex, 1);
      }
    });
  }
});

type HttpServerType = HttpServer | HttpsServer;

const websocketService = {
  addConnectionListener: (server: HttpServerType) => {
    (server as HttpServer).on("upgrade", (request, socket, head) => {
      websocketService.checkAuth(request, (userId) => {
        console.log(request, userId, 'request and userid in addconnectionlistener')
        if (!userId) {
          console.log("Unauthorized WebSocket connection. Destroying socket...");
          socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
          socket.destroy();
        } else {
          wss.handleUpgrade(request, socket, head, (websocket: WebSocket) => {
            wss.emit("connection", websocket, userId);
          });
        }
      });
    });
  },
  checkAuth: async (req: any, callback: (userId?: string) => void) => {
    const userId = req.url?.split("?userid=")[1];

    if (userId && userId !== "0") {
      try {
        // TODO: read from our real user table?
        // const user = await new User().read(userId);
        callback(userId);
        return;
      } catch (error) {
        console.log({ error }, "Failed to check socket authentication.");
      }
    }
    callback();
  },
  send: (recipientId: number[], messageType: string, messageContent: any) => {
    recipientId.forEach((id) => {
      console.log(id, "userid");
      // TODO: we need to pass in all public addresses/userids of all members of the team
      const client = clients[id];

      if (client?.sockets) {
        const data = { type: messageType, content: messageContent };
        client.sockets.forEach((socket) => {
          socket.send(JSON.stringify(data));
        });
      }
    });
  },
};

export default websocketService;
