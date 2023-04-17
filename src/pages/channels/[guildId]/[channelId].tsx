import { type NextPage } from "next";
import { useRouter } from "next/router";

const ServerPage: NextPage = () => {
  const router = useRouter();
  const { guildId, channelId } = router.query;

  return (
    <div>
      {guildId}/{channelId}
    </div>
  );
};

export default ServerPage;
