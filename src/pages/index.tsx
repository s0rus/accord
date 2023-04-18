import { type GetServerSideProps, type NextPage } from "next";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { getServerAuthSession } from "~/server/auth";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Accord</title>
        <meta name="description" content="Accord - clone of discord" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen">
        <button onClick={() => void signOut()}>logout</button>
      </main>
    </>
  );
};

export default Home;

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
    redirect: {
      destination: "/channels/@me",
      permanent: false,
    },
  };
};
