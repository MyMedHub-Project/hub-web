"use client";

import { LogoSVGComponent, Spinner } from "@/components/icons";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/button";
import Link from "next/link";
import { Input } from "@/components/input";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import OnboardingContext from "@/app/auth/onboarding/onboarding-context";
import { useRouter } from "next/navigation";
import { verifyPhone } from "@/actions/verify-phone-action";
import { Routes } from "@/core/routing";

const ProgressAnimation: React.FC<{ isVerified: boolean }> = ({
	isVerified
}) => {
	return (
		<div className="w-full flex items-center">
			<div
				className={cn(
					"flex-1 h-1 bg-hubGrey relative overflow-hidden before:absolute before:w-full before:left-0 before:h-1 before:bg-hubGreen before:transition before:duration-150",
					!isVerified
						? "before:-translate-x-1/2"
						: " before:-translate-x-0"
				)}
			></div>
			<p className="text-xs rounded-full border border-hubGreen p-1 ml-2">
				{!isVerified ? 1 : 2}/2
			</p>
		</div>
	);
};

const VerifyPhonePage = () => {
	const router = useRouter();
	const [code, setCode] = useState(Array(6).fill(""));
	const [isVerifying, setIsVerifying] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [failed, setFailed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { verificationData } = useContext(OnboardingContext);

	const handleChange = (index: number, value: string) => {
		// Allow only a single alphanumeric character
		if (value.length > 1 || !/^[a-zA-Z0-9]$/.test(value)) {
			const newCode = [...code];
			newCode[index] = ""; // Clear invalid input
			setCode(newCode);
			return;
		}

		// Convert to uppercase if lowercase
		const formattedValue = value.toUpperCase();

		const newCode = [...code];
		newCode[index] = formattedValue;
		setCode(newCode);

		// Move to the next input field if there is a next field
		if (formattedValue && index < code.length - 1) {
			document.getElementById(`code-${index + 1}`)?.focus();
		}

		// Submit the code if all fields are filled
		if (index === code.length - 1 && formattedValue) {
			handleSubmit(newCode.join(""));
		}
	};

	const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
		if (event.key === "Backspace" && code[index] === "") {
			if (index > 0) {
				document.getElementById(`code-${index - 1}`)?.focus();
			} else {
				setFailed(false);
			}
		}
	};

	const handleSubmit = async (code: string) => {
		const verData = {
			countryCode: "NG",
			type: "phone",
			id: verificationData.phone,
			token: code
		};

		setIsVerifying(true);
		const response = await verifyPhone(verData, verificationData.role);

		if (response.status === "success") {
			console.log(response.data);
			setIsVerifying(false);
			setIsVerified(true);
		}

		if (response.status === "failed") {
			console.log(response);
			setIsVerifying(false);
			setFailed(true);
		}
	};

	const handleContinue = () => {
		if (isVerified) {
			if (
				verificationData.role &&
				verificationData.role === "institution"
			) {
				router.push(Routes.auth["create-admin"]);
			} else router.push(Routes.auth["account-created"]);
		}

		setIsLoading(true);
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-[500px] mx-auto flex flex-col items-center text-center shadow-none border-none">
				<CardHeader className="justify-center space-y-4 items-center">
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5 }}
					>
						<LogoSVGComponent width={300} height={40} />
					</motion.div>
					<CardTitle className="text-2xl font-semibold">
						Verify Your Phone Number
					</CardTitle>
					<ProgressAnimation isVerified={isVerified} />
					<CardDescription className="text-sm px-2">
						You&apos;ll receive a verification code via SMS. Enter
						the code to verify your phone number.
					</CardDescription>
				</CardHeader>
				<CardContent className="w-full pb-5">
					<form>
						<div
							className={`w-full grid grid-cols-6 justify-items-center`}
						>
							{code.map((digit, index) => (
								<Input
									key={index}
									id={`code-${index}`}
									className={cn(
										"size-12 text-center",
										failed
											? "border-hubRed"
											: "border-inherit"
									)}
									maxLength={1}
									value={digit}
									onChange={(e) =>
										handleChange(index, e.target.value)
									}
									onKeyDown={(e) => handleKeyDown(index, e)}
								/>
							))}
						</div>
					</form>
					<div className="w-full px-5 mt-3 flex justify-between">
						<Button
							variant={"link"}
							className="text-sm p-0 h-fit flex items-start justify-start"
						>
							Resend Code: {"1:00"}
						</Button>
						{isVerified ? (
							<div className="text-hubGreen flex">
								<Check className="size-5" />
								<span className="text-sm">verified</span>
							</div>
						) : isVerifying ? (
							<Spinner className="text-hubGreen/70 size-5" />
						) : (
							failed && (
								<div className="text-hubRed flex">
									<X className="size-5 mr-2" />
									<span className="text-sm">
										Invalid code
									</span>
								</div>
							)
						)}
					</div>
				</CardContent>

				<CardFooter className="flex flex-col w-full px-10">
					<Button
						disabled={!isVerified || isLoading}
						className="w-full gap-x-2 bg-hubGreen hover:bg-hubGreen/95 disabled:bg-hubGreen/90 disabled:text-secondary"
						onClick={handleContinue}
					>
						Continue
						{isLoading && <Spinner className="size-4" />}
					</Button>
					<div className="text-sm text-center mt-4">
						Already have an account?{" "}
						<Link
							href={Routes.auth["sign-in"]}
							className="text-blue-600"
						>
							Log In
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default VerifyPhonePage;
