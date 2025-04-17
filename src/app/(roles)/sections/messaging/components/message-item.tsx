import { User2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Message } from "@/types/message";

const MessageItem = ({ message }: { message: Message }) => (
	<div className="flex gap-x-2 items-end justify-end">
		{message.senderId !== 1 ? (
			<div className="border-4 flex items-center justify-center rounded-full size-8">
				<User2 className="size-[80%]" />
			</div>
		) : null}
		<Card
			className={cn(
				"bg-hub-grey p-4 text-sm rounded-2xl flex flex-col gap-y-3",
				message.senderId === 0
					? "flex-1 rounded-bl-none bg-hub-green/80 text-white"
					: "rounded-br-none w-[calc(100%-40px)]"
			)}
		>
			<p>{message.content}</p>
			<span className={cn("self-end text-xs")}>04:20 PM</span>
		</Card>
	</div>
);

export default MessageItem;
