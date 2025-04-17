"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import { ChevronRight, LogOut } from "lucide-react";
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
import { Button } from "../ui/button";
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

const NavMenu = ({ expanded, user }: { user: User; expanded: boolean }) => {
	const { type } = user;

	const role = type === "institution_provider" ? "doctor" : type;

	let pathname = usePathname();
	if (pathname === "/dashboard") {
		pathname = "/";
	}

	return (
		<div
			className={cn(
				"flex-1 flex flex-col justify-between",
				expanded ? "mt-10" : "mt-5"
			)}
		>
			{menuItems.map((section, index) => (
				<div
					className={cn(
						"grid",
						expanded ? "grid-cols-3 gap-5" : "grid-cols-1 gap-y-4"
					)}
					key={index}
				>
					{section.items.map((item) => {
						if (item.visible.includes(role)) {
							{
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.label}
										href={item.href}
										className={cn(
											"flex flex-col-reverse justify-center gap-y-4 rounded-lg text-sm transition-colors",
											expanded
												? "w-full h-[100px] p-5"
												: "w-10 h-fit px-3 py-2",
											isActive
												? "bg-hubGreen text-white"
												: expanded
													? "bg-hubGreen/15 text-hubGrey"
													: "text-hubGrey hover:bg-hubGreen/30 hover:text-white"
										)}
									>
										<span
											className={cn(
												"text-xs",
												expanded
													? "flex justify-between"
													: "hidden"
											)}
										>
											{item.label}{" "}
											<ChevronRight className="size-4" />
										</span>
										<span className="items-center">
											{item.icon}
										</span>
									</Link>
								);
							}
						}
					})}
				</div>
			))}

			<div className="flex flex-col-reverse gap-y-3 w-fit">
				{expanded ? (
					<div className="text-xs text-white/50">
						<p>MyMedHub</p>
						<p>V1.0</p>
					</div>
				) : null}

				<Dialog>
					<DialogTrigger asChild className=" mx-auto block">
						<Button
							className={cn(
								"w-fit flex items-center gap-3 rounded-lg py-2 text-xs text-hubRed bg-transparent",
								expanded
									? "px-1 bg-hubRed/10 hover:bg-hubRed/15"
									: "px-3 bg-none hover:bg-none"
							)}
						>
							<LogOut /> {expanded ? "Log Out" : null}
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
									onClick={() => signOut()}
									className="bg-hubRed hover:bg-hubRed text-hubGrey w-1/2 h-10 py-4"
								>
									Log Out
								</Button>
							</DialogFooter>
						</DialogContent>
					</DialogOverlay>
				</Dialog>
			</div>
		</div>
	);
};

export default NavMenu;
