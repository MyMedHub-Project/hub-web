"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signInVerification } from "@/actions/signInVerification";
import { Routes } from "@/core/routing";
import { VerificationView } from "@/view/auth/common/VerificationView";
import { redactPhoneOrEmail } from "@/view/auth/sign-in-verification/helper";
import { signInVerificationResend } from "@/actions/signInVerificationResend";
import { useSignIn } from "@/hooks/useSignIn";

const SignInVerificationView = () => {
	const router = useRouter();
	const {
		id,
		setId,
		setToken,
		setType,
		setValue,
		token,
		twoFactorRequired,
		type,
		value
	} = useSignIn();

	const onCodeCompletion = async (code: string) =>
		signInVerification({ id, token: code });

	const onCodeResend = async () => {
		const response = await signInVerificationResend({ id });

		if (response instanceof Error) return response;

		if (!response) return;

		setId(response.id);
		setToken(response.token);
		setType(response.type);
		setValue(response.value);
	};

	const onContinue = () => {
		router.push(Routes.DASHBOARD.ROOT);
		return;
	};

	const verificationMode = type === "email" ? "email" : "phone number";
	const verificationValue =
		value && type ? `(${redactPhoneOrEmail(type, value)})` : "";

	const pageTitle = "Verify Token";
	const pageDescription = `A verification code has been sent to your ${verificationMode} ${verificationValue}. Please enter the code below to complete your login.`;

	useEffect(() => {
		if (!id) {
			router.push(Routes.AUTH.SIGN_IN.ROOT);
			return;
		}

		if (!twoFactorRequired) {
			router.push(Routes.DASHBOARD.ROOT);
			return;
		}

		if (twoFactorRequired && (!id || !token)) {
			router.push(Routes.AUTH.SIGN_IN.ROOT);
			return;
		}
	}, [id, router, token, twoFactorRequired]);

	return (
		<VerificationView
			pageTitle={pageTitle}
			pageDescription={pageDescription}
			initialCodeValue={token}
			onCodeCompletion={onCodeCompletion}
			onCodeResend={onCodeResend}
			onContinue={onContinue}
		/>
	);
};

export default SignInVerificationView;
