import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api, type RouterOutputs } from "~/utils/api";
import { cn } from "~/utils/cn";
import { AvatarWithFallback } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface ConversationListProps {
  activeConversationId?: string;
}

const ConversationList = ({ activeConversationId }: ConversationListProps) => {
  const { data: session } = useSession();
  const { data } = api.conversation.getAll.useQuery();

  const getMessageReceiver = (
    members: RouterOutputs["conversation"]["getAll"][0]["members"]
  ) => {
    return (
      members.find((member) => member.userId !== session?.user.id)?.user ?? null
    );
  };

  return (
    <div className="min-w-[220px] overflow-hidden bg-secondary">
      <div className="flex h-screen max-h-screen w-full flex-col">
        <button onClick={() => void signOut()}>logout</button>
        <ScrollArea className="h-full w-full ">
          <h2 className="mx-4 scroll-m-20 pt-4 text-xs font-bold uppercase tracking-tight text-secondary-foreground">
            Direct Messages
          </h2>
          <div className="mx-2 my-2">
            {data?.map((conversation) => {
              const receiverUser = getMessageReceiver(conversation.members);
              const isActiveConversation =
                conversation.id === activeConversationId;

              if (!receiverUser) return null;

              return (
                <Link
                  key={conversation.id}
                  href={`/channels/@me/${conversation.id}`}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "h-12 w-full justify-start px-2",
                    isActiveConversation && "bg-accent text-foreground"
                  )}
                >
                  <AvatarWithFallback
                    src={receiverUser.image}
                    className="h-8 w-8"
                  />
                  <span className="ml-2 text-base font-semibold leading-none">
                    {receiverUser.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ConversationList;
