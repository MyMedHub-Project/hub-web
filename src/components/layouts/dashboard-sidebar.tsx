"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
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

const menuItems = [
	{
		items: [
			{
				icon: "",
				label: "Dashboard",
				href: `/`,
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: "",
				label: "My Conditions",
				href: "/conditions",
				visible: ["patient", "institution"]
			},
			{
				icon: "",
				label: "Treatment Plans",
				href: "/treatment-plans",
				visible: ["doctor"]
			},
			{
				icon: "",
				label: "Appointments",
				href: "/appointments",
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: "",
				label: "Orders",
				href: "/orders",
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: "",
				label: "Lab Results",
				href: "/results",
				visible: ["doctor"]
			},
			{
				icon: "",
				label: "Messages",
				href: `/messaging`,
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: "",
				label: "My Family",
				href: "/family",
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: "",
				label: "Settings",
				href: `/settings`,
				visible: ["patient", "doctor", "institution"]
			},
			{
				icon: "",
				label: "Help/Support",
				href: `/support`,
				visible: ["patient", "doctor", "institution"]
			}
		]
	}
];

const DashboardSideBar = ({ user }: { user: User }) => {
	const { type } = user;

	const role = type === "institution_provider" ? "doctor" : type;

	const pathname = usePathname();

	return (
		<div className="mt-8 flex-1 flex flex-col justify-between">
			{menuItems.map((section, index) => (
				<div className="space-y-2" key={index}>
					{section.items.map((item) => {
						if (item.visible.includes(role)) {
							{
								const isActive = pathname === item.href;
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
										{/* <Image src={item.icon} key={item.label} alt=""/> */}
										<span className="text-xs">
											{item.label}
										</span>
									</Link>
								);
							}
						}
					})}
				</div>
			))}

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
								Delete Account
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
	);
};

export default DashboardSideBar;
