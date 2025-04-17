import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { MedHubLogoSVGComponent } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";
import { Routes } from "@/core/routing";

// Import dashboard components dynamically with proper loading
const DashboardNavbar = dynamic(
	() => import("@/components/layouts/dashboard-navbar"),
	{
		ssr: true,
		loading: () => (
			<div className="grid grid-cols-3 gap-5 items-center p-5 text-hub-black shadow-xs bg-[#f7f8fa] animate-pulse">
				<div className="h-16 bg-gray-200 rounded-md"></div>
				<div className="h-10 bg-gray-200 rounded-md"></div>
				<div className="h-10 bg-gray-200 rounded-md"></div>
			</div>
		)
	}
);

const DashboardSideBar = dynamic(
	() => import("@/components/layouts/dashboard-sidebar"),
	{
		ssr: true
	}
);

export default async function DashboardLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Get session from cached auth to avoid duplicate auth checks
	const session = await auth();
	if (!session?.user) redirect(Routes.AUTH.SIGN_IN.ROOT);

	return (
		<div className="min-h-screen bg-[#f7f8fa] relative">
			<aside className="fixed top-0 left-0 h-full flex flex-col bg-hub-black-sec rounded-r-lg p-4 transition-transform duration-300 ease-in-out sm:translate-x-0 w-32 -translate-x-full">
				<Link
					href="/"
					className="flex items-center gap-2 justify-center mt-4"
				>
					<MedHubLogoSVGComponent />
				</Link>
				<Separator className="mt-10" />
				<DashboardSideBar />
			</aside>

			<div className="min-h-screen flex flex-col transition-all duration-300 ease-in-out ml-32 max-w-screen overflow-x-clip">
				<DashboardNavbar />
				<main className="p-4 flex-1 flex flex-col">{children}</main>
			</div>
		</div>
	);
}
