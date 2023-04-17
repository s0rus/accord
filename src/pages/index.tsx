import { type NextPage } from "next";
import Head from "next/head";
import GuildList from "~/components/GuildList/GuildList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Accord</title>
        <meta name="description" content="Accord - clone of discord" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen">
        <GuildList />
      </main>
    </>
  );
};

export default Home;
