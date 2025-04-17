"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Routes } from "@/core/routing";
import SuccessView from "@/view/auth/common/SuccessView";
import { useForgotPassword } from "@/hooks/useForgotPassword";

const ForgotPasswordSuccess = () => {
	const router = useRouter();
	const { passwordReset } = useForgotPassword();

	const handleContinue = () => {
		router.push(Routes.AUTH.SIGN_IN.ROOT);
	};

	useEffect(() => {
		if (!passwordReset) {
			router.push(Routes.AUTH.FORGOT_PASSWORD.ROOT);
			return;
		}
	}, [passwordReset, router]);

	return (
		<SuccessView
			pageTitle="Password Reset Success"
			pageDescription="Your password has been reset successfully. You can now log in to your account."
			onContinue={handleContinue}
			onContinueLabel="Proceed to Log In"
		/>
	);
};

export default ForgotPasswordSuccess;
