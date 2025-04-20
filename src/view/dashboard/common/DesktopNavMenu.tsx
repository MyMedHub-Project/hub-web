"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
	ArrowRightIconSVGComponent,
	DesktopNavCloseButton,
	LogoutIconSVGComponent
} from "@/components/icons";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/components/ui/card";
import { NavItemData, NavState } from "@/types/types";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { MobileWhiteLogoSVGComponent } from "@/components/icons/mobile";
import { LogoutButton } from "@/view/dashboard/common/LogoutButton";
import { MedHubLogoSVGComponent } from "../../../components/icons/index";

interface NavItemProps {
	initialItem: string;
	navItems: NavItemData[];
}

const NavItem = ({ initialItem, navItems }: NavItemProps) => {
	const [currentItem, setCurrentItem] = useState(initialItem);

	const handleNavItemClick = (item: NavItemData) =>
		setCurrentItem(item.label);

	return (
		<div className="w-full grid grid-cols-3 gap-6">
			{navItems.map((item) => (
				<Link
					onClick={(e) => {
						e.preventDefault();
						handleNavItemClick(item);
					}}
					key={item.label}
					href={item.href}
					className={cn(
						"h-[112px] flex flex-col gap-6 p-6 items-start justify-center rounded-lg text-sm font-normal bg-hub-grey/10 text-white",
						currentItem === item.label
							? "bg-hub-green text-white"
							: "hover:bg-hub-green/10 hover:text-white"
					)}
				>
					<span className="size-5">{item.icon}</span>
					<span className="w-full flex items-center justify-between">
						<span>{item.label}</span>
						<ArrowRightIconSVGComponent
							className={cn(
								"fill-[#808080]",
								currentItem === item.label && "fill-white"
							)}
						/>
					</span>
				</Link>
			))}
		</div>
	);
};

interface DesktopSideNavProps {
	state: NavState;
	onStateChange: (state: NavState) => void;
	navItems: NavItemData[];
}

export const DesktopSideNav = ({
	navItems,
	onStateChange,
	state
}: DesktopSideNavProps) => {
	const handleNavToggle = () => {
		onStateChange(state === "closed" ? "open" : "closed");
	};

	return (
		<div
			className={cn(
				"self-start absolute w-[80px] h-full flex flex-col items-center bg-hub-black border-0 pb-10 pt-[30px] max-sm:hidden"
			)}
		>
			<div className="rounded-lg flex items-center justify-center">
				<MedHubLogoSVGComponent />
			</div>

			<div className="relative">
				<Separator className="my-6 mt-[34px] w-[80%] border-hub-grey/10 bg-hub-grey/10 border-[1px]" />
				<button
					onClick={handleNavToggle}
					className="m-0 p-0 absolute top-0 right-0 mt-[22px] -mr-13 h-7 w-7 rounded-lg bg-hub-green flex items-center justify-center"
				>
					<ChevronRight size={18} />
				</button>
			</div>

			<div className="flex flex-col items-center gap-4">
				{navItems.map((item, i) => (
					<Link
						className={cn(
							"w-10 h-10 bg-transparent rounded-lg flex items-center justify-center",
							i === 1 && "bg-hub-green"
						)}
						key={item.label}
						href={item.href}
					>
						<div className="fill-hub-black size-5">{item.icon}</div>
					</Link>
				))}
			</div>

			<LogoutIconSVGComponent className="fill-hub-red h-4 w-4	 my-auto mb-10 p-0" />
		</div>
	);
};

interface DesktopNavMenuProps {
	navItems: NavItemData[];
	state: NavState;
	onStateChange: (state: NavState) => void;
}

const DesktopNavMenu = ({
	navItems,
	onStateChange,
	state
}: DesktopNavMenuProps) => {
	const handleNavToggle = () => {
		onStateChange(state === "closed" ? "open" : "closed");
	};

	return (
		<Card
			className={cn(
				"absolute h-full w-[70%] max-w-[813px] top-0 left-0 border-0 flex flex-col max-sm:hidden p-12 pt-8 bg-hub-black rounded-none rounded-r-lg transition-transform duration-300 ease-in-out z-40 shadow-none",
				state === "open" ? "translate-x-0" : "-translate-x-full"
			)}
		>
			<CardHeader className="p-0 m-0flex items-center justify-start ">
				<MobileWhiteLogoSVGComponent />
			</CardHeader>
			<CardContent className="relative">
				<Separator className="my-10 border-hub-grey/10 bg-hub-grey/10 border-[1px]" />

				<NavItem initialItem={navItems[0].label} navItems={navItems} />

				<button
					onClick={handleNavToggle}
					className="m-0 p-0 absolute top-0 right-0 mt-6 -mr-16"
				>
					<DesktopNavCloseButton />
				</button>
			</CardContent>
			<CardFooter className="p-0 m-0 self-start py-10 flex flex-col items-start gap-2">
				<LogoutButton onStateChange={handleNavToggle} state={state} />

				<p className="text-hub-subdue flex flex-col gap-1 text-[10px]">
					<span>MyMedHub</span>
					<span>V1.0</span>
				</p>
			</CardFooter>
		</Card>
	);
};

export default memo(DesktopNavMenu);
