import { type Message, type User } from "@prisma/client";
import { useRef, useState, type ChangeEvent } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import ChatMessage from "./ChatMessage/ChatMessage";

export type MessageWithUser = Message & {
  user: User;
};

interface ConversationChatProps {
  conversation: RouterOutputs["conversation"]["getById"];
}

const ConversationChat = ({ conversation }: ConversationChatProps) => {
  const { mutate: postMessage } = api.conversation.postMessage.useMutation();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleSendMessage = () => {
    if (!newMessage || !conversation?.id) return;

    postMessage({
      conversationId: conversation.id,
      content: newMessage,
    });
  };

  const messageReceiver = conversation?.messageReceiver?.user?.name ?? "";

  return (
    <div className="w-full bg-accent/80">
      <div className="flex h-screen flex-col px-6 pb-2">
        <ScrollArea className="h-full w-full">
          {conversation?.messages?.map((message, index) => {
            const previousMessage = conversation?.messages?.[index - 1];

            return (
              <ChatMessage
                key={message.id}
                message={message}
                previousMessage={previousMessage}
              />
            );
          })}
        </ScrollArea>
        <Button onClick={handleSendMessage}>Send</Button>
        <ScrollArea type="always" className="max-h-64 min-h-[36px]">
          <Textarea
            ref={ref}
            rows={1}
            className="h-auto resize-none overflow-hidden"
            placeholder={`Message @${messageReceiver}`}
            onInput={handleInput}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ConversationChat;
