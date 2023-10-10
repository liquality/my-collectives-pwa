import { useEffect } from "react";
import socket from "../services/SocketService";

const useSocketSetup = () => {
    useEffect(() => {
        socket.connect();
        socket.on("connect_error", () => {
            console.log('Not logged in, not authorized')
        });
        return () => {
            socket.off("connect_error");
        };
    }, []);
};

export default useSocketSetup;