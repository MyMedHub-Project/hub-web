import {
	ArrowLeft,
	LucideSendHorizontal,
	Paperclip,
	Phone,
	User2,
	Video
} from "lucide-react";
import { Input } from "@/components/input";
import { Card } from "@/components/ui/card";
import MessageItem from "./message-item";
import CallDialog from "./call-dialog";

const messages = Array(5)
	.fill(null)
	.map(() => ({
		content:
			"Hello Mr. Anderson. How are you doing today? Kindly forward the documents we talked about to my email. hendricks@gmail.com",
		senderId: Math.round(Math.random()) // Generates either 0 or 1
	}));

const Conversation = () => (
	<Card className="flex-1 p-4 flex flex-col overflow-y-hidden">
		<header className="p-3 grid grid-cols-[auto_1fr_auto_auto] items-center bg-hub-grey rounded">
			<ArrowLeft />
			<div className="flex items-center gap-x-1">
				<div className="size-[40px] border-2 rounded-full">
					<User2 className="size-[90%]" />
				</div>
				<div>
					<h3 className="font-semibold">Dr. Hendricks</h3>
					<p className="text-sm">online</p>
				</div>
			</div>
			<div className="flex gap-x-2">
				<CallDialog type="voice">
					<Phone className="size-4 fill-hub-black" />
				</CallDialog>
				<CallDialog type="video">
					<Video className="size-4 fill-hub-black" />
				</CallDialog>
			</div>
		</header>

		<div className="flex-1 mt-5 px-3 flex flex-col gap-y-2 overflow-y-auto custom-scrollbar">
			{messages.map((message, index) => (
				<MessageItem key={index} message={message} />
			))}
		</div>

		<div className="flex items-center gap-x-3 mb-3 mt-3">
			<Paperclip className="size-5 text-hub-black cursor-pointer" />
			<div className="bg-hub-grey relative w-[300px] h-10 rounded-full">
				<Input
					className="size-full pr-12 bg-transparent border-none focus-visible:ring-0"
					placeholder="Write a message"
				/>
				<LucideSendHorizontal className="absolute size-7 right-2.5 top-1/2 -translate-y-1/2 fill-hub-green text-hub-grey cursor-pointer" />
			</div>
		</div>
	</Card>
);

export default Conversation;
