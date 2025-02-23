"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "@/components/button";
import { SuccessSVGComponent } from "@/components/icons";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Routes } from "@/core/routing";

const AccountCreatedPage = () => {
	useEffect(() => {
		localStorage.removeItem("token");
		localStorage.removeItem("verification_data");
	}, []);

	return (
		<Card className="flex flex-col w-[500px] shadow-none border-none">
			<CardHeader className="flex items-center space-y-5">
				<SuccessSVGComponent />
				<CardTitle className="text-xl font-semibold">
					Account Created.
				</CardTitle>
				<CardDescription className="text-sm text-center">
					Thank you for taking your time to create an account with us.
					Now let&apos;s go explore the app.
				</CardDescription>
			</CardHeader>
			<CardFooter className="">
				<Button className="w-full bg-hubGreen text-sm">
					<Link href={Routes.auth["sign-in"]} className="size-full">
						Proceed to Log In
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default AccountCreatedPage;
