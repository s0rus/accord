import { type GetServerSideProps, type NextPage } from "next";
import { signOut } from "next-auth/react";
import GuildList from "~/components/GuildList/GuildList";
import { getServerAuthSession } from "~/server/auth";

const MePage: NextPage = () => {
  return (
    <main className="flex h-screen w-screen">
      <GuildList />
      <button onClick={() => void signOut()}>logout</button>
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
