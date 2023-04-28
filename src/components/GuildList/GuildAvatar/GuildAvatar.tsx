import Link from "next/link";
import { AvatarWithFallback } from "~/components/ui/avatar";
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
            <AvatarWithFallback
              src={imageSrc}
              width={12}
              height={12}
              className={cn("my-1 mt-4", className)}
            />
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
