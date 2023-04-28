import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type GetServerSidePropsContext,
  type InferGetStaticPropsType,
} from "next";
import superjson from "superjson";
import ConversationChat from "~/components/ConversationChat/ConversationChat";
import ConversationList from "~/components/ConversationList/ConversationList";
import GuildList from "~/components/GuildList/GuildList";
import { appRouter } from "~/server/api/root";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

const ConversationPage = (
  props: InferGetStaticPropsType<typeof getServerSideProps>
) => {
  const { conversationId } = props;

  const { data: conversation } = api.conversation.getById.useQuery({
    conversationId,
  });

  if (!conversation) return null;

  return (
    <main className="flex h-screen w-screen">
      <GuildList />
      <ConversationList activeConversationId={conversationId} />
      <ConversationChat conversation={conversation} />
    </main>
  );
};

export default ConversationPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ conversationId: string }>
) {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session },
    transformer: superjson,
  });

  const conversationId = context.params?.conversationId as string;
  if (!conversationId) throw new Error("No conversationId");

  await ssg.conversation.getById.prefetch({ conversationId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      conversationId,
      revalidate: 1,
    },
  };
}
