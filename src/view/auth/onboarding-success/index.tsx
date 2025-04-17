"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Routes } from "@/core/routing";
import SuccessView from "@/view/auth/common/SuccessView";
import OnboardingContext from "@/app/auth/onboarding/context";

const OnboardingSuccessView = () => {
	const router = useRouter();
	const { verificationData } = useContext(OnboardingContext);

	const handleContinue = () => router.push(Routes.AUTH.SIGN_IN.ROOT);

	useEffect(() => {
		if (
			!verificationData?.phoneVerified ||
			!verificationData?.emailVerified
		) {
			router.push(Routes.AUTH.ONBOARDING.ROOT);
			return;
		}
	}, [
		verificationData?.emailVerified,
		verificationData?.phoneVerified,
		router
	]);

	return (
		<SuccessView
			pageTitle="	You are good to go."
			pageDescription={`Thank you for taking your time to create an account with us. Now
				let's go explore the app.`}
			onContinue={handleContinue}
			onContinueLabel="Proceed to Log In"
		/>
	);
};

export default OnboardingSuccessView;
