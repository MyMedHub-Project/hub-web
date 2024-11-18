import { Button } from "@/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader
} from "@/components/ui/card";
import PhoneNoInput from "@/components/ui/phonenoinput";
import React from "react";

const ForgotPassword = () => {
	return (
		<Card className="w-[400px] flex flex-col min-h-full border-0 shadow-none">
			<CardHeader className="text-center font-bold text-xl pb-1">
				Forgot your password?
			</CardHeader>
			<CardDescription className="text-center text-xs">
				Please enter the phone number associated with your MyMedHub
				account. We&apos;ll send you a link to reset your password.
			</CardDescription>
			<CardContent className="py-5">
				<PhoneNoInput />
			</CardContent>
			<CardFooter>
				<Button className="w-full bg-green-600 font-normal text-sm">
					Get Code
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ForgotPassword;
