import { type GetServerSideProps, type NextPage } from "next";
import ConversationList from "~/components/ConversationList/ConversationList";
import GuildList from "~/components/GuildList/GuildList";
import { getServerAuthSession } from "~/server/auth";

const MePage: NextPage = () => {
  return (
    <main className="flex h-screen w-screen">
      <GuildList />
      <ConversationList />
    </main>
  );
};

export default MePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
