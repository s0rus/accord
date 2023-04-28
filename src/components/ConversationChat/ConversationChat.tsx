import { type Message, type User } from "@prisma/client";
import { useRef, useState, type ChangeEvent } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import ChatMessage from "./ChatMessage/ChatMessage";
import { useChatScroll } from "./hooks/useChatScroll";

export type MessageWithUser = Message & {
  user: User;
};

interface ConversationChatProps {
  conversation: RouterOutputs["conversation"]["getById"];
}

const ConversationChat = ({ conversation }: ConversationChatProps) => {
  const { mutateAsync: postMessage } =
    api.conversation.postMessage.useMutation();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<MessageWithUser[]>(
    conversation.messages ?? []
  );
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useChatScroll(messages);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage || !conversation?.id) return;

    const postedMessage = await postMessage({
      conversationId: conversation.id,
      content: newMessage,
    });

    setMessages((prevMessages) => [...prevMessages, postedMessage]);
    setNewMessage("");
  };

  const messageReceiver = conversation?.messageReceiver?.user?.name ?? "";

  return (
    <div className="w-full bg-accent/80">
      <div className="flex h-screen flex-col pb-2 pl-2 pr-1">
        <ScrollArea type="always" className="h-full w-full" ref={scrollRef}>
          {messages.map((message, index) => {
            const previousMessage = messages[index - 1];

            return (
              <ChatMessage
                key={message.id}
                message={message}
                previousMessage={previousMessage}
              />
            );
          })}
        </ScrollArea>
        <Button onClick={() => void handleSendMessage()}>Send</Button>
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
