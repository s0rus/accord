import { type Message, type User } from "@prisma/client";
import { type RouterOutputs } from "~/utils/api";
import { ScrollArea } from "../ui/scroll-area";
import ChatInput from "./ChatInput/ChatInput";
import ChatMessage from "./ChatMessage/ChatMessage";
import { useChatScroll } from "./hooks/useChatScroll";

export type MessageWithUser = Message & {
  user: User;
};

interface ConversationChatProps {
  conversation: RouterOutputs["conversation"]["getById"];
}

const ConversationChat = ({ conversation }: ConversationChatProps) => {
  const messages = conversation?.messages ?? [];
  const scrollRef = useChatScroll(messages);

  const messageReceiver = conversation?.messageReceiver?.user?.name ?? "";

  return (
    <div className="w-full bg-accent/80">
      <div className="flex h-screen max-w-full flex-col pb-2 pl-2 pr-1">
        <ScrollArea type="always" className="h-full w-full" ref={scrollRef}>
          {messages.map((message, index) => {
            const previousMessage = messages[index - 1];

            return (
              <ChatMessage
                key={message.id}
                message={message}
                previousMessage={previousMessage}
                isLastMessage={index === messages.length - 1}
              />
            );
          })}
        </ScrollArea>
        <ChatInput
          conversationId={conversation.id}
          messageReceiver={messageReceiver}
        />
      </div>
    </div>
  );
};

export default ConversationChat;
