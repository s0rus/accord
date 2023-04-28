import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const conversationRouter = createTRPCRouter({
  getById: publicProcedure
    .input(
      z.object({
        conversationId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const foundConversation = await ctx.prisma.conversation.findUnique({
        where: {
          id: input.conversationId,
        },
        include: {
          messages: {
            include: {
              user: true,
            },
          },
          members: {
            include: {
              user: true,
            },
          },
        },
      });

      return {
        ...foundConversation,
        messageReceiver:
          foundConversation?.members.find(
            (member) => member.userId !== ctx.session?.user.id
          ) ?? null,
      };
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.conversation.findMany({
      where: {
        members: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
  }),

  postMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newMessage = await ctx.prisma.message.create({
        data: {
          content: input.content,
          conversationId: input.conversationId,
          userId: ctx.session.user.id,
        },
      });

      return newMessage;
    }),
});
