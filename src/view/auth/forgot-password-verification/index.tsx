"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { forgotPassword } from "@/actions/forgotPassword";
import { forgotPasswordVerification } from "@/actions/forgotPasswordVerification";
import { Routes } from "@/core/routing";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { VerificationView } from "@/view/auth/common/VerificationView";

const ForgotPasswordVerificationView = () => {
	const router = useRouter();
	const { devToken, email, id, setDevToken, setId, setTokenVerified } =
		useForgotPassword();

	const onCodeCompletion = async (code: string) => {
		const response = await forgotPasswordVerification({
			id,
			token: code
		});

		if (response instanceof Error) return response;

		setTokenVerified(true);
	};

	const onCodeResend = async () => {
		const response = await forgotPassword({
			type: "email",
			email
		});

		if (response instanceof Error) return response;
		if (!response) return;

		setId(response.id);
		response.devToken && setDevToken(response.devToken);
	};

	const onContinue = () => router.push(Routes.AUTH.FORGOT_PASSWORD.RESET);

	const pageTitle = "Verify Reset Token";
	const pageDescription =
		"Please enter the code sent to your email to complete your password reset.";

	useEffect(() => {
		if (!id) {
			router.push(Routes.AUTH.FORGOT_PASSWORD.ROOT);
			return;
		}
	}, [id, router]);

	return (
		<VerificationView
			pageTitle={pageTitle}
			pageDescription={pageDescription}
			initialCodeValue={devToken}
			onCodeCompletion={onCodeCompletion}
			onCodeResend={onCodeResend}
			onContinue={onContinue}
		/>
	);
};

export default ForgotPasswordVerificationView;
