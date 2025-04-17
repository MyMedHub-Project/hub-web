"use client";

import { SuccessSVGComponent } from "@/components/icons";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SubmitButton } from "@/view/auth/common/SubmitButton";

interface SuccessView {
	pageTitle: string;
	pageDescription: string;
	onContinue: () => void;
	onContinueLabel: string;
}

export default function SuccessView({
	onContinue,
	onContinueLabel,
	pageDescription,
	pageTitle
}: SuccessView) {
	return (
		<Card className="grow w-[450px] flex flex-col items-center justify-center my-5 border-none shadow-none max-sm:w-[85%] gap-5">
			<div className="pb-5">
				<SuccessSVGComponent />
			</div>

			<CardTitle className="text-xl font-semibold">{pageTitle}</CardTitle>
			<CardDescription className="text-sm text-center">
				{pageDescription}
			</CardDescription>

			<SubmitButton
				label={onContinueLabel}
				loadingState="active"
				onClick={onContinue}
			/>
		</Card>
	);
}
