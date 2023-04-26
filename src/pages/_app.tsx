import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "@fontsource/lato";
import "~/styles/globals.css";
import { SocketProvider } from "~/context/Socket.context";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
