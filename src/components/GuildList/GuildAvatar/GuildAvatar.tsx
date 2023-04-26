import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/utils/cn";

interface GuildAvatarProps {
  href: string;
  imageSrc: string;
  name: string;
  className?: string;
}

const GuildAvatar = ({ href, imageSrc, name, className }: GuildAvatarProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger className="block" asChild>
          <Link href={href}>
            <Avatar className={cn("my-1 mt-4 h-12 w-12", className)}>
              <AvatarImage src={imageSrc} />
              <AvatarFallback>
                <Skeleton className="h-12 w-12 rounded-full" />
              </AvatarFallback>
            </Avatar>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="font-bold">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GuildAvatar;
