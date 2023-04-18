import { type GetServerSideProps, type NextPage } from "next";
import { useRouter } from "next/router";
import { getServerAuthSession } from "~/server/auth";

const GuildPage: NextPage = () => {
  const router = useRouter();
  const { guildId, channelId } = router.query;

  return (
    <div>
      {guildId}/{channelId}
    </div>
  );
};

export default GuildPage;

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
