import React from "react";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import DashboardSideBar from "@/components/layouts/dashboard-sidebar";
import { auth } from "@/auth";
import { Routes } from "@/core/routing";

export default async function DashboardLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (!session?.user) {
		redirect(Routes.auth["sign-in"]);
	}

	const { user } = session;

	return (
		<div className="min-h-screen bg-[#f7f8fa] relative">
			<DashboardSideBar user={user} />

			<div className="min-h-screen flex flex-col transition-all duration-300 ease-in-out ml-0 sm:ml-[70px] max-w-[calc(100vw-5px)] sm:max-w-[calc(100vw-80px)] overflow-x-clip">
				<DashboardNavbar user={user} />
				<main className="w-full py-4 flex-1 flex flex-col">
					{children}
				</main>
			</div>
		</div>
	);
}
