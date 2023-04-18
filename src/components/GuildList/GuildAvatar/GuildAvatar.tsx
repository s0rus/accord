import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/utils/cn";

interface GuildAvatarProps {
  href: string;
  imageSrc: string;
  className?: string;
}

const GuildAvatar = ({ href, imageSrc, className }: GuildAvatarProps) => {
  return (
    <Link href={href}>
      <Avatar className={cn("my-1 mt-4 h-12 w-12", className)}>
        <AvatarImage src={imageSrc} />
        <AvatarFallback>
          <Skeleton className="h-12 w-12 rounded-full" />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default GuildAvatar;
