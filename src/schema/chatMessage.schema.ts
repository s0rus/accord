import { z } from "zod";

export const chatMessageSchema = z.object({
  conversationId: z.string(),
  content: z.string().min(1).max(255),
});
