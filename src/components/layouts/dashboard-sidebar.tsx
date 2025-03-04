"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const DashboardSideBar = ({ user }: { user: User }) => {
	const { type } = user;

	const role = type === "institution_provider" ? "doctor" : type;

	const menuItems = [
		{
			items: [
				{
					icon: "",
					label: "Dashboard",
					href: `/${role}`,
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
					href: "/treatments",
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
					href: "/dashboard/sections/orders",
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
					href: `/${role}/messaging`,
					visible: ["patient", "doctor", "institution"]
				},
				{
					icon: "",
					label: "My Family",
					href: "/dashboard/sections/family",
					visible: ["patient", "doctor", "institution"]
				},
				{
					icon: "",
					label: "Settings",
					href: `/${role}/settings`,
					visible: ["patient", "doctor", "institution"]
				},
				{
					icon: "",
					label: "Help/Support",
					href: `/${user?.type}/support`,
					// href: "/dashboard/sections/support",
					visible: ["patient", "doctor", "institution"]
				}
			]
		}
	];

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

			<Button
				onClick={() => signOut()}
				className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-hubred"
			>
				Logout
			</Button>
		</div>
	);
};

export default DashboardSideBar;
