"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import {
	AppointmentIconSVGComponent,
	ChatIconSVGComponent,
	ConditionIconSVGComponent,
	FamilyIconSVGComponent,
	HelpIconSVGComponent,
	HomeIconSVGComponent,
	OrderIconSVGComponent,
	ResultsIconSVGComponent,
	SettingsSVGComponent,
	TreatmentIconSVGComponents
} from "../icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { useClientSession } from "@/hooks/useClientSession";

const menuItems = [
	{
		items: [
			{
				icon: <HomeIconSVGComponent />,
				label: "Dashboard",
				href: `/`,
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: <ConditionIconSVGComponent />,
				label: "My Conditions",
				href: "/conditions",
				visible: ["patient", "institution"]
			},
			{
				icon: <TreatmentIconSVGComponents />,
				label: "Treatment Plans",
				href: "/treatment-plans",
				visible: ["doctor"]
			},
			{
				icon: <AppointmentIconSVGComponent />,
				label: "Appointments",
				href: "/appointments",
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: <OrderIconSVGComponent />,
				label: "Orders",
				href: "/orders",
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: <ResultsIconSVGComponent />,
				label: "Lab Results",
				href: "/results",
				visible: ["doctor"]
			},
			{
				icon: <ChatIconSVGComponent />,
				label: "Messages",
				href: `/messaging`,
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: <FamilyIconSVGComponent />,
				label: "My Family",
				href: "/family",
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: <SettingsSVGComponent />,
				label: "Settings",
				href: `/settings`,
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: <HelpIconSVGComponent />,
				label: "Help/Support",
				href: `/support`,
				visible: ["patient", "doctor", "institution"]
			}
		]
	}
];

// Memoized NavItem component to prevent re-renders
const NavItem = memo(
	({
		isActive,
		item,
		role
	}: {
		item: (typeof menuItems)[0]["items"][0];
		isActive: boolean;
		role: string;
	}) => {
		if (!item.visible.includes(role)) return null;

		return (
			<Link
				key={item.label}
				href={item.href}
				className={cn(
					"flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
					isActive
						? "bg-emerald-500 text-white"
						: "text-gray-300 hover:bg-emerald-500/10 hover:text-white"
				)}
			>
				<span className="text-xs sr-only">{item.label}</span>
				<span className="items-center">{item.icon}</span>
			</Link>
		);
	}
);
NavItem.displayName = "NavItem";

// Memoized LogoutButton to prevent re-renders
const LogoutButton = memo(() => {
	const handleLogout = useCallback(() => signOut(), []);

	return (
		<Dialog>
			<DialogTrigger asChild className=" mx-auto block">
				<Button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-hubRed bg-transparent">
					Logout
				</Button>
			</DialogTrigger>
			<DialogOverlay className="bg-hubGrey200/80">
				<DialogContent className="bg-white max-w-[500px] px-5 py-10">
					<DialogHeader className="text-center text-hubBlack">
						<DialogTitle className="text-center text-xl mb-4">
							Log Out
						</DialogTitle>
						<DialogDescription className="text-center text-lg">
							Are you sure you want to logout?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="gap-x-3 mt-2">
						<DialogClose asChild>
							<Button className="bg-hubGrey hover:bg-hubGrey text-hubBlack w-1/2 h-10 py-4">
								Cancel
							</Button>
						</DialogClose>
						<Button
							onClick={handleLogout}
							className="bg-hubRed hover:bg-hubRed text-hubGrey w-1/2 h-10 py-4"
						>
							Log Out
						</Button>
					</DialogFooter>
				</DialogContent>
			</DialogOverlay>
		</Dialog>
	);
});
LogoutButton.displayName = "LogoutButton";

// Use auth context instead of props for better performance
const DashboardSideBar = memo(() => {
	const { isLoading, user } = useClientSession();
	const pathname = usePathname();

	// Move all hooks to the top level before any conditionals
	// Use safe access with optional chaining (?.) for user properties
	const role = useMemo(
		() =>
			(user?.type === "institution_provider" ? "doctor" : user?.type) ||
			"patient",
		[user?.type]
	);

	// Normalize pathname for comparison
	const normalizedPathname = useMemo(
		() => (pathname === "/dashboard" ? "/" : pathname),
		[pathname]
	);

	// Loading state
	if (isLoading) {
		return (
			<div className="mt-8 flex-1 flex flex-col justify-between opacity-50">
				<div className="space-y-2 animate-pulse">
					{[1, 2, 3, 4, 5].map((i) => (
						<div
							key={i}
							className="h-10 bg-gray-700 rounded-lg"
						></div>
					))}
				</div>
			</div>
		);
	}

	// If no user is found, return empty sidebar
	if (!user) return null;

	return (
		<div className="mt-8 flex-1 flex flex-col justify-between">
			{menuItems.map((section, index) => (
				<div className="space-y-2" key={index}>
					{section.items.map((item) => (
						<NavItem
							key={item.label}
							item={item}
							isActive={normalizedPathname === item.href}
							role={role}
						/>
					))}
				</div>
			))}

			<LogoutButton />
		</div>
	);
});

DashboardSideBar.displayName = "DashboardSideBar";

export default DashboardSideBar;
