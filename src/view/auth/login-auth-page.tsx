"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
// import Link from "next/link";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
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
// import { verify } from "@/actions/verification-action";
import { Routes } from "@/core/routing";
import { verifyLogin } from "@/actions/login-verification-action";

const LoginAuthPage = ({ id }: { id?: string }) => {
	const router = useRouter();
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
		setIsVerifying(true);
		const err = await verifyLogin(code);

		console.log(err);

		if (!err) {
			setIsVerifying(false);
			setIsVerified(true);
		}

		if (err?.status === "retry") {
			setIsVerifying(false);
			setErrorOccured(true);
			setFailed(true);
		}

		if (err?.status === "failed") {
			setIsVerifying(false);
			setFailed(true);
		}
	};

	const handleContinue = () => {
		if (isVerified) {
			setIsLoading(true);
			router.push(Routes.root);
		}
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
						Verify Token
					</CardTitle>
					<CardDescription className="text-sm px-2">
						Verify token to complete login
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
							variant="link"
							className="text-sm p-0 h-fit flex items-start justify-start"
						>
							Resend Code: 1:00
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
				</CardFooter>
			</Card>
		</div>
	);
};

export default LoginAuthPage;
