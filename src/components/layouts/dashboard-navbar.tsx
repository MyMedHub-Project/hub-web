"use client";

import { AvatarIcon } from "@radix-ui/react-icons";
import { ChevronDown, MessageCircleIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { useMemo } from "react";
import { BellSVGComponent, SearchIconSVGComponent } from "../icons";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Routes } from "@/core/routing";
import { useClientSession } from "@/hooks/useClientSession";

const DashboardNavbar = () => {
	const { isLoading, user } = useClientSession();

	const formattedDate = useMemo(() => format(new Date(), "dd MMM, yyyy"), []);

	if (isLoading) {
		return (
			<div className="grid grid-cols-3 gap-5 items-center justify-between p-5 text-hubBlack max-w-screen top-0 sticky bg-[#f7f8fa] shadow-sm z-50 animate-pulse">
				<div className="h-16 bg-gray-200 rounded-md"></div>
				<div className="h-10 bg-gray-200 rounded-md"></div>
				<div className="h-10 bg-gray-200 rounded-md"></div>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-3 gap-5 items-center justify-between p-5 text-hubBlack max-w-screen top-0 sticky bg-[#f7f8fa] shadow-sm z-50">
			{/* USER NAME */}
			<div className="flex flex-col leading-relaxed">
				<h2 className="text-xl font-bold leading-tight">
					Hello {user?.firstname || "John Doe"}.
				</h2>
				<p className="">How are you feeling today?</p>
				<span className="text-gray-400 text-sm">{formattedDate}</span>
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

				<DropdownMenu>
					<DropdownMenuTrigger>
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
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>
							<Link href={Routes.profile.view}>My Account</Link>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="p-0">
							<Link
								href={Routes.profile.view}
								className="size-full p-2"
							>
								Profile
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default DashboardNavbar;
