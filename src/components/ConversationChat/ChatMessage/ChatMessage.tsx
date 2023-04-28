import dayjs from "dayjs";
import { AvatarWithFallback } from "~/components/ui/avatar";
import { cn } from "~/utils/cn";
import { type MessageWithUser } from "../ConversationChat";

interface ChatMessageProps {
  message: MessageWithUser;
  previousMessage?: MessageWithUser;
}

const ChatMessage = ({ message, previousMessage }: ChatMessageProps) => {
  const formatMessageDate = (date: Date) => {
    const dateToFormat = dayjs(date);

    if (dateToFormat.isToday()) {
      return `Today at ${dateToFormat.format("h:mm A")}`;
    } else if (dateToFormat.isYesterday()) {
      return `Yesterday at ${dateToFormat.format("h:mm A")}`;
    }
    return dateToFormat.format("DD/MM/YYYY h:mm A");
  };

  const isPreviousMessageRelated =
    previousMessage?.userId === message.userId &&
    dayjs(previousMessage?.createdAt).isSame(
      dayjs(message.createdAt),
      "minute"
    );

  return (
    <div
      key={message.id}
      className={cn(
        "flex w-full items-end",
        !isPreviousMessageRelated && "mt-4"
      )}
    >
      <div className="mr-2 w-12 self-stretch">
        {!isPreviousMessageRelated && (
          <AvatarWithFallback src={message.user.image} width={10} height={10} />
        )}
      </div>
      <div className="w-full">
        {!isPreviousMessageRelated && (
          <div className="flex flex-row items-baseline">
            <h3 className="text-base font-semibold leading-none">
              {message.user.name}
            </h3>
            <span className="ml-2 text-xs font-semibold text-muted-foreground">
              {formatMessageDate(message.createdAt)}
            </span>
          </div>
        )}
        <div>
          <span>{message.content}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
