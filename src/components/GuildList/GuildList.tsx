import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const GuildList = () => {
  const mockArray = new Array(100).fill(0);

  return (
    <nav className="h-screen max-h-screen max-w-fit overflow-hidden bg-[#1e1f22] px-3">
      <ScrollArea className="h-full w-full" hidden>
        <Link href="/channels/@me">
          <Avatar className="my-1 mt-4 h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SO</AvatarFallback>
          </Avatar>
        </Link>
        <Separator className="my-2" />
        {mockArray.map((_, index) => (
          <Link href={`/channels/${index}/69420`} key={index}>
            <Avatar className="my-1 h-12 w-12">
              <AvatarImage src="https://github.com/s0rus.png" />
              <AvatarFallback>SO</AvatarFallback>
            </Avatar>
          </Link>
        ))}
      </ScrollArea>
    </nav>
  );
};

export default GuildList;
