import {
	LogoSVGComponent,
	MedHub,
	MedHubLogoSVGComponent
} from "@/components/icons";
import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import DashboardSideBar from "@/components/layouts/dashboard-sidebar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

export default async function DashboardLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// <div className="min-h-screen text-hubBlack w-full flex flex-row justify-between">
		// 	<aside className="w-1/4 lg:w-1/6 bg-hubBlackSec rounded-r-lg p-4 min-h-screen fixed left-0 top-0">
		// 		<Link
		// 			href="/"
		// 			className="flex items-center gap-2 justify-center mt-4"
		// 		>
		// 			<MedHubLogoSVGComponent />
		// 			{/* <span className="hidden lg:block"><MedHub /></span> */}
		// 		</Link>
		// 		<Separator className="mt-8" />
		// 		<DashboardSideBar />
		// 	</aside>
		// 	<div className="w-full flex flex-col min-h-screen ml-[25%] lg:ml-[16.67%] bg-[#F7F8FA]">
		// 		<DashboardNavbar />
		// 		<main className="max-w-full p-4">{children}</main>
		// 	</div>
		// </div>
		<div className="min-h-screen bg-[#f7f8fa] relative">
			<aside className="fixed top-0 left-0 h-full bg-hubBlackSec rounded-r-lg p-4 transition-transform duration-300 ease-in-out sm:translate-x-0 w-32 -translate-x-full">
				<Link
					href="/"
					className="flex items-center gap-2 justify-center mt-4"
				>
					<MedHubLogoSVGComponent />
				</Link>
				<Separator className="mt-10" />
				<DashboardSideBar />
			</aside>

			{/* Main */}
			<div className="min-h-screen transition-all duration-300 ease-in-out ml-32 max-w-screen overflow-x-clip">
				<DashboardNavbar />
				<main className="p-4 h-full">{children}</main>
			</div>
		</div>
	);
}
