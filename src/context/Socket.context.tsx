import { useSession } from "next-auth/react";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";
import type { Socket } from "socket.io-client";
import { socket } from "~/utils/socket";

const SocketContext = createContext<Socket>(socket);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();

  useEffect(() => {
    // socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket");
      socket.emit("JOIN_USER", session?.user.name);
    });

    return () => {
      socket.off("connect");
    };
  }, [session?.user.name]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
