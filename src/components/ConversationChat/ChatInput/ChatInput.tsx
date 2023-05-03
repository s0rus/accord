import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { chatMessageSchema } from "~/schema/chatMessage.schema";
import { api } from "~/utils/api";
import { useInputResize } from "../hooks/useInputResize";

interface ChatInputProps {
  conversationId?: string;
  messageReceiver: string;
}

const ChatInput = ({ conversationId, messageReceiver }: ChatInputProps) => {
  const utils = api.useContext();
  const { mutate: createMessage } = api.conversation.createMessage.useMutation({
    onSuccess: () => {
      void utils.conversation.getById.invalidate();
    },
  });

  const { register, watch, resetField } = useForm({
    defaultValues: {
      content: "",
    },
    reValidateMode: "onChange",
    resolver: zodResolver(chatMessageSchema),
  });
  const messageContent = register("content");
  const newMessage = watch("content");
  const { inputRef, handleInputResize } = useInputResize();

  const handleSendMessage = () => {
    if (!newMessage || !conversationId) return;

    try {
      createMessage({
        conversationId,
        content: newMessage,
      });

      resetField("content");
    } catch (error) {
      // TODO: Handle error
      console.log(error);
    }
  };

  return (
    <ScrollArea type="always" className="max-h-64 min-h-[36px]">
      <Textarea
        {...messageContent}
        ref={(e) => {
          messageContent.ref(e);
          inputRef.current = e;
        }}
        rows={1}
        className="h-auto resize-none overflow-hidden"
        placeholder={`Message @${messageReceiver}`}
        onChange={(e) => {
          // TODO: Handle resize on chat sent when message overflows and is scrollable, it should return to the basic
          // TODO: size after sending the message
          void messageContent.onChange(e);
          handleInputResize(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
    </ScrollArea>
  );
};

export default ChatInput;
