import { AvatarIcon } from "@radix-ui/react-icons";
import { ChevronDown, MessageCircleIcon, SearchIcon } from "lucide-react";
import { format } from "date-fns";
import { User } from "next-auth";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Routes } from "@/core/routing";
import { BellSVGComponent } from "../icons";

const NotificationIcon = () => (
	<>
		<div className="bg-white rounded-full size-5 lg:size-7 flex items-center justify-center cursor-pointer relative">
			<MessageCircleIcon />
			<div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-hubRed text-white rounded-full text-xs">
				1
			</div>
		</div>
		<div className="bg-white rounded-full size-5 lg:size-7 flex items-center justify-center cursor-pointer relative">
			<BellSVGComponent />
			<div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-hubRed text-white rounded-full text-xs">
				1
			</div>
		</div>
	</>
);

const DashboardNavbar = async ({ user }: { user: User }) => (
	<div className="grid grid-cols-[auto,auto,auto] gap-5 items-center justify-between p-5 text-hubBlack max-w-screen top-0 sticky bg-[#f7f8fa] shadow-sm z-20">
		<div className="flex flex-col leading-relaxed">
			<h2 className="text-lg lg:text-xl font-bold leading-tight">
				Hello {user?.firstname || "John Doe"}.
			</h2>
			<p className="text-sm lg:text-base">How are you feeling today?</p>
			<span className="text-gray-400 text-xs lg:text-sm">
				{format(new Date(), "dd MMM, yyyy")}
			</span>
		</div>

		<div className="flex items-center gap-3">
			<div className="relative rounded-md bg-hubGrey w-[170px] lg:w-[220px] pl-8 lg:pl-10 pr-2">
				<SearchIcon className="size-5 absolute top-1/2 -translate-y-1/2 left-2 lg:left-3 cursor-pointer" />
				<input
					type="text"
					placeholder="Search for"
					className="bg-transparent text-hubBlack outline-none w-full py-2 lg:py-3"
				/>
			</div>

			<div className="hidden md:flex gap-x-1.5 items-center">
				<NotificationIcon />
			</div>
		</div>

		<DropdownMenu>
			<DropdownMenuTrigger className="w-fit">
				<div className="w-fit flex items-center bg-hubGreenLight p-2 md:py-3 md:px-3 lg:px-4 rounded-full gap-x-1.5">
					<AvatarIcon className="rounded-full size-7 lg:size-9" />
					<div className="hidden md:flex flex-col items-start">
						<span className="text-sm lg:text-sm font-semibold max-w-28 lg:max-w-32 truncate">
							{user?.firstname} {user?.lastname}
						</span>
						<span className="text-xs lg:text-sm text-hubBlack/80 max-w-28 lg:max-w-32 truncate">
							{user?.email}
						</span>
					</div>
					<ChevronDown className="size-4" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					<Link href={Routes.profile.view}>My Account</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="p-0 md:hidden">
					<NotificationIcon />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

export default DashboardNavbar;
