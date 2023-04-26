import { io } from "socket.io-client";

const SOCKET_URL = "ws://localhost:1337";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});
