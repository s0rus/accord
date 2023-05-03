import dayjs from "dayjs";
import { AvatarWithFallback } from "~/components/ui/avatar";
import { cn } from "~/utils/cn";
import { type MessageWithUser } from "../ConversationChat";

interface ChatMessageProps {
  message: MessageWithUser;
  previousMessage?: MessageWithUser;
  isLastMessage?: boolean;
}

const ChatMessage = ({
  message,
  previousMessage,
  isLastMessage,
}: ChatMessageProps) => {
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

  // TODO: Figure out better way to handle word wrapping and overflowing

  return (
    <div
      key={message.id}
      className={cn(
        "flex w-full",
        !isPreviousMessageRelated && "mt-4",
        isLastMessage && "mb-4"
      )}
    >
      <div className="mr-2 w-12 self-stretch">
        {!isPreviousMessageRelated && (
          <AvatarWithFallback src={message.user.image} width={10} height={10} />
        )}
      </div>
      <div className="max-w-[150ch] break-words">
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
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
