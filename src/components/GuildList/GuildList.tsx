import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import GuildAvatar from "./GuildAvatar/GuildAvatar";

const GuildList = () => {
  const mockArray = new Array(100).fill(0);

  return (
    <nav className="h-screen min-w-fit overflow-hidden bg-background px-3">
      <ScrollArea className="h-full w-full" hidden>
        <GuildAvatar
          href="/channels/@me"
          imageSrc="https://github.com/shadcn.png"
          name="Direct Messages"
        />
        <Separator className="my-2" />
        {mockArray.map((_, index) => (
          <GuildAvatar
            key={index}
            href={`/channels/${index}/69420`}
            imageSrc="https://github.com/s0rus.png"
            className="mt-0"
            name={`Guild ${index}`}
          />
        ))}
      </ScrollArea>
    </nav>
  );
};

export default GuildList;
