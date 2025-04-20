"use client";

import {
	AppointmentIconSVGComponent,
	ChatIconSVGComponent,
	ConditionIconSVGComponent,
	FamilyIconSVGComponent,
	HelpIconSVGComponent,
	HomeIconSVGComponent,
	OrderIconSVGComponent,
	ResultsIconSVGComponent,
	SettingsSVGComponent
} from "@/components/icons/dashboard";
import { Overlay } from "@/components/ui/overlay";
import { NavState } from "@/types/types";
import DesktopNavMenu, {
	DesktopSideNav
} from "@/view/dashboard/common/DesktopNavMenu";
import MobileNavMenu from "@/view/dashboard/common/MobileNavMenu";

const navigationItems = [
	{
		icon: <HomeIconSVGComponent className=" h-inherit w-inherit" />,
		label: "Dashboard",
		href: `/`
	},
	{
		icon: <ConditionIconSVGComponent className=" h-inherit w-inherit" />,
		label: "My Conditions",
		href: "/conditions"
	},
	{
		icon: <AppointmentIconSVGComponent className=" h-inherit w-inherit" />,
		label: "Appointments",
		href: "/appointments"
	},
	{
		icon: <OrderIconSVGComponent className=" h-inherit w-inherit" />,
		label: "Orders",
		href: "/orders"
	},
	{
		icon: <ResultsIconSVGComponent className=" h-inherit w-inherit" />,
		label: "Test Results",
		href: "/results"
	},
	{
		icon: (
			<ChatIconSVGComponent className="fill-white h-inherit w-inherit" />
		),
		label: "Messages",
		href: `/messaging`
	},
	{
		icon: <FamilyIconSVGComponent className=" h-inherit w-inherit" />,
		label: "My Family",
		href: "/family"
	},
	{
		icon: <SettingsSVGComponent className=" h-inherit w-inherit" />,
		label: "Settings",
		href: `/settings`
	},
	{
		icon: <HelpIconSVGComponent className=" h-inherit w-inherit" />,
		label: "Help/Support",
		href: `/support`
	}
];

interface NavMenuProps {
	state: "open" | "closed";
	onStateChange: (state: NavState) => void;
	// navItems: INavItem[];
}

const NavMenu = ({ onStateChange, state }: NavMenuProps) => (
	<>
		<Overlay
			isOpen={state === "open"}
			onClick={() =>
				onStateChange(state === "closed" ? "open" : "closed")
			}
		>
			<MobileNavMenu
				navItems={navigationItems}
				state={state}
				onStateChange={onStateChange}
			/>
			<DesktopNavMenu
				navItems={navigationItems}
				state={state}
				onStateChange={onStateChange}
			/>
		</Overlay>

		<DesktopSideNav
			navItems={navigationItems}
			onStateChange={onStateChange}
			state={state}
		/>
	</>
);

export default NavMenu;
