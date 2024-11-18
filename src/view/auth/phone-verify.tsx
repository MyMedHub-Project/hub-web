"use client";

import { LogoSVGComponent } from "@/components/icons";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/button";
import Link from "next/link";
import { Input } from "@/components/input";
import { useRouter } from "next/router";

const VerifyPhonePage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);

	const handleChange = (index: number, value: number) => {
		if (value <= 1) {
			const newCode = [...code];
			newCode[index] = value;
			setCode(newCode);
			if (value && index < 5) {
				document.getElementById(`code-${index + 1}`)?.focus();
			}
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Verification Code:", code.join(""));
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-[500px] mx-auto flex flex-col items-center text-center">
				<CardHeader className="justify-center space-y-4 items-center">
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5 }}
					>
						<LogoSVGComponent width={280} height={35} />
					</motion.div>
					<CardTitle className="text-xl font-semibold">
						Verify Your Phone Number
					</CardTitle>
					<CardDescription>
						You&apos;ll receive a verification code via SMS. Enter
						the code to verify your phone number.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="flex justify-center space-x-2 mb-4">
							{code.map((digit, index) => (
								<Input
									key={index}
									id={`code-${index}`}
									className="w-10 text-center"
									maxLength={1}
									value={digit}
									onChange={(e) =>
										handleChange(index, e.target.value)
									}
								/>
							))}
						</div>
					</form>
				</CardContent>
				<Button
					variant={"link"}
					className="text-sm flex items-start justify-start"
				>
					Resend Code
				</Button>
				<CardFooter className="flex flex-col w-full">
					<Button className="w-full mb-2 bg-green-600">
						Continue
					</Button>
					<div className="text-sm text-center mt-4">
						Already have an account?{" "}
						<Link href="/auth/sign-in" className="text-blue-600">
							Log In
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default VerifyPhonePage;
