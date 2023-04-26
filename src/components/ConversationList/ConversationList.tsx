import React from "react";
import { api } from "~/utils/api";
import { ScrollArea } from "../ui/scroll-area";
import { type RouterOutputs } from "~/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

const ConversationList = () => {
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
        <ScrollArea className="h-full w-full ">
          <h2 className="mx-4 scroll-m-20 pt-4 text-xs font-bold uppercase tracking-tight text-secondary-foreground">
            Direct Messages
          </h2>
          <div className="mx-2 my-2">
            {data?.map((conversation) => {
              const receiverUser = getMessageReceiver(conversation.members);

              if (!receiverUser) return null;

              return (
                <Button
                  key={conversation.id}
                  variant="ghost"
                  className="h-12 w-full justify-start px-2"
                >
                  <Avatar className="my-1 h-8 w-8">
                    {/* TODO: add image fallback in case it's undefined  */}
                    <AvatarImage src={receiverUser.image ?? undefined} />
                    <AvatarFallback>
                      <Skeleton className="h-12 w-12 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="ml-2 text-base font-semibold leading-none">
                    {receiverUser.name}
                  </span>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ConversationList;
