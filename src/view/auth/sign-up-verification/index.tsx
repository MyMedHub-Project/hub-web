"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { signUpVerification } from "@/actions/signUpVerification";
import OnboardingContext from "@/app/auth/onboarding/context";
import { Routes } from "@/core/routing";
import { VerificationView } from "@/view/auth/common/VerificationView";
import { signUpVerificationResend } from "@/actions/signUpVerificationResend";

interface SignUpVerificationViewProps {
	type: "phone" | "email";
}

const SignUpVerificationView = ({ type }: SignUpVerificationViewProps) => {
	const router = useRouter();
	const { setVerificationData, verificationData } =
		useContext(OnboardingContext);

	const devToken =
		type === "email"
			? verificationData.emailToken
			: verificationData.phoneToken;

	const id =
		type === "email" ? verificationData.email : verificationData.phone;

	const onCodeCompletion = async (code: string) => {
		const response = await signUpVerification(
			{
				countryCode: verificationData.countryCode,
				type,
				token: code,
				id
			},
			verificationData.role
		);

		if (response instanceof Error) return response;

		setVerificationData({
			...verificationData,
			...(type === "email" && { emailVerified: response.emailVerified }),
			...(type === "phone" && { phoneVerified: response.phoneVerified })
		});
	};
	const onCodeResend = async () => {
		const response = await signUpVerificationResend({
			type: verificationData.role === "patient" ? "user" : "institution",
			data: {
				id,
				type,
				countryCode: verificationData.countryCode
			}
		});

		if (response instanceof Error) return response;

		setVerificationData({
			...verificationData,
			emailToken: response.emailToken,
			phoneToken: response.phoneToken
		});
	};

	const onContinue = () => {
		let path = null;

		if (verificationData.emailVerified) {
			path = Routes.AUTH.ONBOARDING.VERIFY_PHONE;
		}

		if (
			verificationData.phoneVerified &&
			verificationData.emailVerified &&
			verificationData.role === "patient"
		) {
			path = Routes.AUTH.ONBOARDING.SUCCESS;
		}

		if (
			verificationData.phoneVerified &&
			verificationData.emailVerified &&
			verificationData.role === "institution"
		) {
			path = Routes.AUTH.ONBOARDING.INSTITUTION.ADMIN;
		}

		path && router.push(path);
	};

	const pageTitle =
		type === "email" ? "Verify Your Email" : "Verify Your Phone Number";
	const pageDescription = `You'll receive a verification code via ${type === "email" ? "provided Email" : "SMS"}. Enter
						the code to verify your ${type === "email" ? "Email" : "phone number"}.`;

	useEffect(() => {
		if (!verificationData?.emailToken || !verificationData?.phoneToken) {
			router.push(Routes.AUTH.SIGN_IN.ROOT);
			return;
		}
	}, [verificationData?.emailToken, verificationData?.phoneToken, router]);

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

export default SignUpVerificationView;
