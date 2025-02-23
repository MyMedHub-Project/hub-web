"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { LogoSVGComponent, Spinner } from "@/components/icons";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";
import OnboardingContext from "@/app/auth/onboarding/onboarding-context";
import { verify } from "@/actions/verification-action";
import { Routes } from "@/core/routing";
import { resendVerificationCode } from "@/actions/verification-resend-action";

const ProgressAnimation: React.FC<{ isVerified: boolean; verFor: string }> = ({
	isVerified,
	verFor
}) => (
	<div className="w-full flex items-center">
		<div
			className={cn(
				"flex-1 h-1 bg-hubGrey relative overflow-hidden before:absolute before:w-full before:left-0 before:h-1 before:bg-hubGreen before:transition before:duration-150",
				!isVerified
					? verFor === "email"
						? "before:-translate-x-2/3"
						: " before:-translate-x-1/3"
					: verFor === "email"
						? "before:-translate-x-1/3"
						: "before:-translate-x-0"
			)}
		></div>
		<p className="text-xs rounded-full border border-hubGreen p-1 ml-2">
			{!isVerified
				? verFor === "email"
					? 1
					: 2
				: verFor === "email"
					? 2
					: 3}
			/3
		</p>
	</div>
);

const VerificationPage = ({ for: verFor }: { for: "phone" | "email" }) => {
	const router = useRouter();
	const [secs, setSecs] = useState(60);
	const [resendDisabled, setResendDisabled] = useState(true);
	const [code, setCode] = useState(Array(6).fill(""));
	const [isVerifying, setIsVerifying] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [errorOccured, setErrorOccured] = useState(false);
	const [failed, setFailed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { verificationData } = useContext(OnboardingContext);

	const handleChange = (index: number, value: string) => {
		if (value.length > 1 || !/^[a-zA-Z0-9]$/.test(value)) {
			const newCode = [...code];
			newCode[index] = "";
			setCode(newCode);
			return;
		}

		const formattedValue = value.toUpperCase();

		const newCode = [...code];
		newCode[index] = formattedValue;
		setCode(newCode);

		if (formattedValue && index < code.length - 1) {
			document.getElementById(`code-${index + 1}`)?.focus();
		}

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
			type: verFor === "email" ? "email" : "phone",
			id:
				verFor === "email"
					? verificationData.email
					: verificationData.phone,
			token: code
		};

		setIsVerifying(true);
		const response = await verify(verData, verificationData.role);

		if (response.status === "success") {
			setIsVerifying(false);
			setIsVerified(true);
		}

		if (response.status === "retry") {
			setIsVerifying(false);
			setErrorOccured(true);
			setFailed(true);
		}

		if (response.status === "failed") {
			setIsVerifying(false);
			setFailed(true);
		}
	};

	const handleContinue = () => {
		setIsLoading(true);

		if (isVerified) {
			router.push(
				verFor === "email"
					? Routes.auth["verify-phone"]
					: verificationData.role === "patient"
						? Routes.auth["account-created"]
						: Routes.auth["create-admin"]
			);
		}
	};

	const handleCodeResend = async () => {
		setSecs(60);

		const data = {
			countryCode: verificationData.countryCode,
			role: verificationData.role,
			type: verFor,
			id:
				verFor === "phone"
					? verificationData.phone
					: verificationData.email
		};

		const res = await resendVerificationCode(data);

		console.log(res);
	};

	useEffect(() => {
		if (secs <= 0) {
			setResendDisabled(false);
			return;
		}

		setResendDisabled(true);
		const interval = setInterval(() => {
			setSecs((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [secs]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<p>&lt;</p>
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
						{verFor === "email"
							? "Verify Your Email"
							: "Verify Your Phone Number"}
					</CardTitle>
					<ProgressAnimation
						isVerified={isVerified}
						verFor={verFor}
					/>
					<CardDescription className="text-sm px-2">
						{`You&apos;ll receive a verification code via ${verFor === "email" ? "provided Email" : "SMS"}. Enter
						the code to verify your ${verFor === "email" ? "Email" : "phone number"}.`}
					</CardDescription>
				</CardHeader>
				<CardContent className="w-full pb-5">
					<form>
						<div className="w-full grid grid-cols-6 justify-items-center">
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
							onClick={handleCodeResend}
							disabled={resendDisabled}
							variant="link"
							className="text-sm p-0 h-fit flex items-start justify-start"
						>
							Resend Code
							{secs === 60
								? ": 1:00"
								: !resendDisabled
									? ""
									: `: ${secs}`}
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
										{errorOccured
											? "Error, try again"
											: "Invalid code"}
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
						{isLoading ? <Spinner className="size-4" /> : null}
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

export default VerificationPage;
