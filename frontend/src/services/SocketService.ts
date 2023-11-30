import { io } from "socket.io-client";

const url = import.meta.env.VITE_SERVER_PRODUCTION_URL || "http://localhost:3000";

const socket = io(url, {
    withCredentials: true,
    auth: {
        token: 'dummy-user-id', // Send your JWT token here
    },
});

export default socket
