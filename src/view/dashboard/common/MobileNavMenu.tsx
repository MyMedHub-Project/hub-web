import { X } from "lucide-react";
import Link from "next/link";
import { memo, useState } from "react";
import { MobileWhiteLogoSVGComponent } from "@/components/icons/mobile";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { NavItemData, NavState } from "@/types/types";
import { LogoutButton } from "@/view/dashboard/common/LogoutButton";
import { ArrowRightIconSVGComponent } from "../../../components/icons/index";

interface NavItemProps {
	initialItem: string;
	navItems: NavItemData[];
}

const NavItem = ({ initialItem, navItems }: NavItemProps) => {
	const [currentItem, setCurrentItem] = useState(initialItem);

	const handleNavItemClick = (item: NavItemData) =>
		setCurrentItem(item.label);

	return (
		<div className="flex-grow w-full flex flex-col gap-4 overscroll-y-auto">
			{navItems.map((item) => (
				<Link
					onClick={(e) => {
						e.preventDefault();
						handleNavItemClick(item);
					}}
					key={item.label}
					href={item.href}
					className={cn(
						"h-12 w-full flex justify-between items-center rounded-lg text-sm p-2 font-normal bg-hub-grey/5 text-white",
						currentItem === item.label
							? "bg-hub-green text-white"
							: "text-gray-300 hover:bg-hub-green/10 hover:text-white"
					)}
				>
					<span className="flex items-center gap-4">
						<span>{item.icon}</span>
						<span>{item.label}</span>
					</span>

					<ArrowRightIconSVGComponent
						className={cn(
							"fill-[#808080]",
							currentItem === item.label && "fill-white"
						)}
					/>
				</Link>
			))}
		</div>
	);
};

interface MobileNavMenuProps {
	navItems: NavItemData[];
	state?: NavState;
	onStateChange: (state: NavState) => void;
}

const MobileNavMenu = ({
	navItems,
	onStateChange,
	state
}: MobileNavMenuProps) => {
	const handleNavToggle = () =>
		onStateChange(state === "closed" ? "open" : "closed");

	return (
		<Card
			className={cn(
				"absolute h-full w-[70%] max-w-[300px] top-0 left-0 border-0 max-sm:flex flex-col bg-hub-black-sec p-6 pt-16 rounded-none rounded-r-lg transition-transform duration-300 ease-in-out z-40 shadow-none",
				state === "open" ? "translate-x-0" : "-translate-x-full"
			)}
		>
			<CardHeader className="p-0 m-0 flex flex-row items-center justify-between">
				<MobileWhiteLogoSVGComponent />

				<Button
					onClick={handleNavToggle}
					className="text-white p-0 m-0"
				>
					<X size={12} />
				</Button>
			</CardHeader>

			<CardContent>
				<Separator className="my-6 border-hub-grey/10 bg-hub-grey/10 border-[1px]" />

				<NavItem initialItem={navItems[0].label} navItems={navItems} />
			</CardContent>

			<CardFooter className="flex-grow mt-auto p-0 m-0 w-full flex items-end">
				<div className="w-full flex justify-between items-center">
					<LogoutButton />

					<p className="text-hub-subdue flex flex-col text-[10px] p-0 m-0">
						<span>MyMedHub</span>
						<span>V1.0</span>
					</p>
				</div>
			</CardFooter>
		</Card>
	);
};

export default memo(MobileNavMenu);
