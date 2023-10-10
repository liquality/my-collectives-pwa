import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    withCredentials: true,
    auth: {
        token: 'dummy-user-id', // Send your JWT token here
    },
});

export default socket
