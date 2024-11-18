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
		<div className="min-h-screen text-hubBlack">
			<div className="flex w-full">
				<aside className="w-30 bg-hubBlackSec rounded-r-lg p-4 min-h-screen fixed left-0 top-0">
					<Link
						href="/"
						className="flex items-center gap-2 justify-center mt-4"
					>
						<MedHubLogoSVGComponent />
						{/* <span className="hidden lg:block"><MedHub /></span> */}
					</Link>
					<Separator className="mt-8" />
					<DashboardSideBar />
				</aside>
				<div className="ml-36 w-full flex flex-col min-h-screen bg-[#F7F8FA]">
					<DashboardNavbar />
					<main className="flex-1 overflow-auto p-4">{children}</main>
				</div>
			</div>
		</div>
	);
}
