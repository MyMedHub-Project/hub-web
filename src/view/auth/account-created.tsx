import { Button } from "@/components/button";
import { SuccessSVGComponent } from "@/components/icons";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const AccountCreatedPage = () => {
	return (
		<Card className="flex flex-col w-[500px]">
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
			<CardFooter>
				<div>
					<Link href="/auth/sign-in">
						<Button className="w-full bg-[#068513] text-xs">
							Proceed to Log In
						</Button>
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
};

export default AccountCreatedPage;
