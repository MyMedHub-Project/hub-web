"use client";

import Link from "next/link";
import React, { useState } from "react";
import { User } from "next-auth";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	MedHubLogoSVGComponent,
	WhiteLogoSVGComponent
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NavMenu from "./nav-menu";

const DashboardSideBar = ({ user }: { user: User }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<aside
			className={cn(
				"fixed top-0 left-0 z-30 h-full flex flex-col bg-hubBlackSec rounded-r-lg transition-transform duration-300 ease-in-out",
				expanded
					? "w-3/4 p-6 translate-x-0"
					: "w-fit p-4 sm:translate-x-0 -translate-x-full"
			)}
		>
			{/* <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10"></div> */}

			<Link
				href="/"
				className="w-fit flex items-center gap-2 justify-center mt-4"
			>
				{expanded ? (
					<WhiteLogoSVGComponent className="w-64" />
				) : (
					<MedHubLogoSVGComponent className="size-10" />
				)}
			</Link>

			<Button
				onClick={() => setExpanded(!expanded)}
				className="bg-hubGreen hover:bg-hubGreen/90 p-0 size-5 flex items-center justify-center absolute top-20 right-0 translate-x-full sm:translate-x-2 z-50"
			>
				{expanded ? (
					<ChevronLeft className="size-4" />
				) : (
					<ChevronRight className="size-4" />
				)}
			</Button>

			<NavMenu user={user} expanded={expanded} />
		</aside>
	);
};

export default DashboardSideBar;
