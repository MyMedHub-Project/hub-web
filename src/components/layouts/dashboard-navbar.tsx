import { AvatarIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";
import { ChevronDown, MessageCircleIcon, Search, Speaker } from "lucide-react";
import {
	BellSVGComponent,
	ChatIconSVGComponent,
	SearchIconSVGComponent
} from "../icons";
import { Separator } from "../ui/separator";
import { auth } from "@/auth";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import { Routes } from "@/core/routing";
import { User } from "next-auth";

const DashboardNavbar = async () => {
	// const session = await auth();

	// if (!session) {
	// 	redirect(Routes.auth["sign-in"]);
	// }

	// const { user } = session;

	const user: User | null = null;

	return (
		<div className="grid grid-cols-3 gap-5 items-center justify-between p-5 text-hubBlack max-w-screen top-0 sticky bg-[#f7f8fa] shadow-sm z-50">
			{/* USER NAME */}
			<div className="flex flex-col leading-relaxed">
				<h2 className="text-xl font-bold leading-tight">
					Hello {user?.firstname}.
				</h2>
				<p className="">How are you feeling today?</p>
				<span className="text-gray-400 text-sm">
					{format(new Date(), "dd MMM, yyyy")}
				</span>
			</div>
			{/* SEARCH BAR */}
			<div className="flex items-center gap-2 text-xs rounded-md bg-hubGrey px-2">
				<div className="flex">
					<SearchIconSVGComponent />
				</div>
				<input
					type="text"
					placeholder="Search for"
					className="bg-transparent text-hubBlack outline-none w-[200px] p-3"
				/>
			</div>
			{/* icons */}
			<div className="flex items-center gap-6 justify-end w-full ">
				<div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
					<MessageCircleIcon />
					<div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-hubRed text-white rounded-full text-xs">
						1
					</div>
				</div>
				<div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
					<BellSVGComponent />
					<div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-hubRed text-white rounded-full text-xs">
						1
					</div>
				</div>
				<div className="flex items-center bg-hubGreenLight py-3 px-4 rounded-full gap-x-1.5">
					<AvatarIcon
						width={36}
						height={36}
						className="rounded-full"
					/>
					<div className="flex flex-col">
						<span className="font-semibold max-w-32 truncate">
							{user?.firstname} {user?.lastname}
						</span>
						<span className="text-sm text-hubBlack/80 max-w-32 truncate">
							{user?.email}
						</span>
					</div>
					<ChevronDown className="size-4" />
				</div>
			</div>
		</div>
	);
};

export default DashboardNavbar;
