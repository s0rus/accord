import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const conversationRouter = createTRPCRouter({
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
});
