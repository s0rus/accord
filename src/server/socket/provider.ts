import type { ServerOptions, Socket as ServerSocket } from "socket.io";
import { Server } from "socket.io";
import type { Socket as ClientSocket } from "socket.io-client";

export interface ServerToClientEvents {}

export interface ClientToServerEvents {}

export interface InterServerEvents {}

export interface SocketData {
  server: Server<ServerToClientEvents, ClientToServerEvents, InterServerEvents>;
}

export const ServerIO = (server: Partial<ServerOptions>) => {
  return new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server);
};

export type ClientIO = ClientSocket<ClientToServerEvents, ServerToClientEvents>;
export type ServerIO = ServerSocket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
