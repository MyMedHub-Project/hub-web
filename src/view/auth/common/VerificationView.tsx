"use client";

import { Check, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Spinner } from "@/components/icons";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAsyncSafeguard } from "@/hooks/useAsyncSafeguard";
import { BtnStatus, LoaderState } from "@/types/types";
import CodeInput from "@/view/auth/common/CodeInput";
import { ErrorToast } from "@/view/auth/common/ErrorToast";
import { OnboardingViewHeader } from "@/view/auth/common/OnboardingViewHeader";
import ResendCodeButton from "@/view/auth/common/ResendCodeButton";
import { SubmitButton } from "@/view/auth/common/SubmitButton";
import { Routes } from "@/core/routing";

interface VerificationViewProps {
	onCodeCompletion: (code: string) => Promise<any | Error>;
	onCodeResend: () => Promise<any>;
	onContinue: () => void;

	pageTitle: string;
	pageDescription: string;
	initialCodeValue?: string;
}

export const VerificationView = ({
	initialCodeValue,
	onCodeCompletion,
	onCodeResend,
	onContinue,
	pageDescription,
	pageTitle
}: VerificationViewProps) => {
	const { safeguard } = useAsyncSafeguard();

	const [error, setError] = useState<string | null>(null);
	const [loaderState, setLoaderState] = useState<LoaderState | null>(null);
	const [continueBtnState, setContinueBtnState] =
		useState<BtnStatus>("disabled");

	const handleCodeCompletion = safeguard(async (code: string) => {
		if (loaderState === "verified") return;

		setLoaderState("verifying");

		const response = await onCodeCompletion(code);

		if (response instanceof Error) {
			setError(response.message);
			setLoaderState("error");
			setContinueBtnState("active");
			return;
		}

		setLoaderState("verified");
		setContinueBtnState("active");
	});

	const handleCodeResend = safeguard(async () => {
		setError(null);
		setLoaderState(null);
		setContinueBtnState("disabled");

		const response = await onCodeResend();

		if (response instanceof Error) {
			setError(response.message);
			setLoaderState("error");
			setContinueBtnState("active");
			return;
		}

		setContinueBtnState("active");
	});

	const handleContinue = () => {
		if (loaderState === "verified") onContinue();
	};

	return (
		<Card className="flex-grow w-[500px] flex flex-col items-center justify-center my-5 border-none shadow-none max-sm:w-[85%] max-sm:justify-start">
			{error ? <ErrorToast error={error} /> : null}

			<OnboardingViewHeader
				title={pageTitle}
				description={pageDescription}
				showProgressBar={false}
			/>

			<CardContent className="w-full max-w-[450px] pb-10 flex flex-col gap-6 max-sm:flex-grow">
				<CodeInput
					onComplete={handleCodeCompletion}
					initialValue={initialCodeValue}
					isError={loaderState === "failed"}
					disabled={loaderState === "verified"}
				/>

				<div className="w-full flex justify-between items-center font-normal">
					<ResendCodeButton
						handleCodeResend={handleCodeResend}
						disabled={loaderState === "verified"}
					/>

					<>
						{loaderState === "verified" ? (
							<div className="text-hubGreen items-center gap-2 flex">
								<Check className="size-5" />
								<span className="text-sm">verified</span>
							</div>
						) : null}

						{loaderState === "verifying" ? (
							<Spinner className="text-hubGreen/70 size-5" />
						) : null}

						{loaderState === "failed" ? (
							<div className="text-hubRed items-center gap-2 flex">
								<X className="size-5" />
								<span className="text-sm">Invalid code</span>
							</div>
						) : null}

						{loaderState === "error" ? (
							<div className="text-hubRed items-center gap-2 flex">
								<X className="size-5" />
								<span className="text-sm">
									Error, try again
								</span>
							</div>
						) : null}
					</>
				</div>

				<SubmitButton
					loadingState={continueBtnState}
					onClick={handleContinue}
					label="Continue"
				/>
			</CardContent>

			<CardFooter className="max-sm:mt-auto">
				<p className="text-sm text-center">
					Return to{" "}
					<Link
						href={Routes.AUTH.SIGN_IN.ROOT}
						className="text-blue-500 hover:underline"
					>
						Log In
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};
