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
} from "@/components/icons";
import { Overlay } from "@/components/ui/overlay";
import { NavState } from "@/types/types";
import DesktopNavMenu from "@/view/dashboard/common/DesktopNavMenu";
import MobileNavMenu from "@/view/dashboard/common/MobileNavMenu";

const navigationItems = [
	{
		icon: <HomeIconSVGComponent />,
		label: "Dashboard",
		href: `/`
	},
	{
		icon: <ConditionIconSVGComponent />,
		label: "My Conditions",
		href: "/conditions"
	},
	{
		icon: <AppointmentIconSVGComponent />,
		label: "Appointments",
		href: "/appointments"
	},
	{
		icon: <OrderIconSVGComponent />,
		label: "Orders",
		href: "/orders"
	},
	{
		icon: <ResultsIconSVGComponent />,
		label: "Test Results",
		href: "/results"
	},
	{
		icon: <ChatIconSVGComponent className="fill-white" />,
		label: "Messages",
		href: `/messaging`
	},
	{
		icon: <FamilyIconSVGComponent />,
		label: "My Family",
		href: "/family"
	},
	{
		icon: <SettingsSVGComponent />,
		label: "Settings",
		href: `/settings`
	},
	{
		icon: <HelpIconSVGComponent />,
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
	<Overlay
		isOpen={state === "open"}
		onClick={() => onStateChange(state === "closed" ? "open" : "closed")}
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
);

export default NavMenu;
