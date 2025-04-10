import { CheckCheck, Search, User2 } from "lucide-react";
import { Input } from "@/components/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Conversation from "./conversation";

const MessagingPage = () => {
	const arr = Array(7).fill(null);
	return (
		<div className=" h-full max-h-[calc(100vh-135px)] flex-1 -mb-2.5 text-hubBlack flex gap-x-1">
			<Card className="w-[400px] flex flex-col overflow-y-hidden">
				<CardHeader className="pb-2">
					<h2 className="font-semibold ml-1 mb-1">Chats</h2>
					<div className="relative bg-hubGrey rounded">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5" />
						<Input className="pl-10 bg-transparent border-none focus-visible:ring-0" />
					</div>
				</CardHeader>
				<CardContent className="flex-1 divide-y pb-0 overflow-y-auto custom-scrollbar">
					{arr.map((item, index) => (
						<div
							key={index}
							className="flex items-center gap-x-4 py-5"
						>
							<div className="size-[60px] rounded-full flex items-center justify-center border-4">
								<User2 className="size-[70%] " />
							</div>
							<div className="flex-1 grid grid-cols-[auto_1fr] gap-y-2 gap-x-2">
								<h3 className="h-fit font-semibold flex items-center gap-x-2 after:block after:size-2 after:rounded-full after:bg-hubBlue">
									Dr. Dolor Manchi
								</h3>
								<span className="text-sm">04:20</span>
								<p className="text-sm truncate">
									Hello Anderson. How are you feeling today?
								</p>
								<CheckCheck className="justify-self-end size-5 text-hubBlue" />
							</div>
						</div>
					))}
				</CardContent>
			</Card>

			<Conversation />
		</div>
	);
};

export default MessagingPage;
