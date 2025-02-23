"use client";

// import { OTPInput } from "input-otp";
import React from "react";
import { Button } from "@/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader
} from "@/components/ui/card";
// import PhoneNoInput from "@/components/ui/phonenoinput";

const VerifyOTP = () => (
	<Card className="w-[400px] flex flex-col">
		<CardHeader className="text-center font-bold text-xl pb-1">
			Enter OTP
		</CardHeader>
		<CardDescription className="text-center text-xs">
			You&apos;ll receive a verification code via SMS. Enter the code to
			verify your phone number
		</CardDescription>
		<CardContent className="py-5">
			{/* <OTPInput /> */}
			<div className="flex justify-between text-xs items-center">
				<span>Resend Code: 1:00</span>
				<p className="font-normal text-green-600">Verified</p>
			</div>
		</CardContent>

		<CardFooter>
			<Button className="w-full bg-green-600 font-normal text-sm">
				Get Code
			</Button>
		</CardFooter>
	</Card>
);

export default VerifyOTP;
