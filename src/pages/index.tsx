import { type NextPage } from "next";
import Head from "next/head";
import { cn } from "~/utils/cn";

import { Button } from "~/components/ui/button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Accord</title>
        <meta name="description" content="Accord - clone of discord" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={cn("h-screen w-screen")}>
        <h1 className="mb-8 scroll-m-20 text-4xl font-extrabold  tracking-tight lg:text-5xl">
          Accord
        </h1>
        <Button variant="default">Click me</Button>
      </main>
    </>
  );
};

export default Home;
