import { createTRPCRouter } from "~/server/api/trpc";
import { conversationRouter } from "./routers/conversation";

export const appRouter = createTRPCRouter({
  conversation: conversationRouter,
});

export type AppRouter = typeof appRouter;
