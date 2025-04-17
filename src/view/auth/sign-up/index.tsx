"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { signUp } from "@/actions/signUp";
import OnboardingContext, {
	VerificationRole
} from "@/app/auth/onboarding/context";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Routes } from "@/core/routing";
import { ErrorToast } from "@/view/auth/common/ErrorToast";
import { OnboardingViewHeader } from "@/view/auth/common/OnboardingViewHeader";
import { InstitutionForm } from "@/view/auth/sign-up/InstitutionForm";
import { PatientForm } from "@/view/auth/sign-up/PatientForm";
import {
	extractDataFromForm,
	IInstitutionSchema,
	institutionDefault,
	institutionSchema,
	IUserSchema,
	userDefault,
	userSchema
} from "@/view/auth/sign-up/helper";
import { BtnStatus } from "@/types/types";

export const SignUpView = ({ type }: { type: VerificationRole }) => {
	const router = useRouter();
	const { setVerificationData, termsAgreed, verificationData } =
		useContext(OnboardingContext);

	const [error, setError] = useState<string | null>(null);
	const [countryCode, setCountryCode] = useState("");
	const [institutionType, setInstitutionType] = useState<string | null>(null);
	const [submitBtnState, setSubmitBtnState] = useState<BtnStatus>("active");

	const formSchema = type === "patient" ? userSchema : institutionSchema;
	const defaultData = type === "patient" ? userDefault : institutionDefault;

	const form = useForm<IUserSchema | IInstitutionSchema>({
		mode: "onBlur",
		resolver: zodResolver(formSchema),
		defaultValues: defaultData
	});

	const onSubmit = async (values: IUserSchema | IInstitutionSchema) => {
		const vData = extractDataFromForm({ type, values, termsAgreed });
		if (!vData) return;

		setError(null);
		setSubmitBtnState("loading");

		const response = await signUp(vData as any, vData.category);
		if (response instanceof Error) {
			setError(response.message);
			setSubmitBtnState("active");
			return;
		}

		const { onboardingToken, token } = response;

		setVerificationData({
			onboardingToken,
			countryCode: vData.countryCode,
			phone: vData.phone,
			email: vData.email,
			role: vData.category,
			phoneToken: token.phoneToken,
			emailToken: token.emailToken,
			phoneVerified: false,
			emailVerified: false
		});

		Cookies.set("verificationData", JSON.stringify(verificationData), {
			expires: 1
		});

		router.push(Routes.AUTH.ONBOARDING.VERIFY_EMAIL);
	};

	useEffect(() => {
		if (!termsAgreed) router.push(Routes.AUTH.ONBOARDING.ROOT);
	});

	const pageTitle =
		type === "institution" ? "Welcome to MyMedHub!" : "Sign Up";
	const pageDescription =
		type === "institution"
			? "Let's get started by registering your health institution"
			: "Please provide your personal and health information";

	return (
		<Card className="min-h-full w-[700px] my-5 border-none shadow-none max-sm:w-[85%]">
			{error ? <ErrorToast error={error} /> : null}

			<OnboardingViewHeader
				title={pageTitle}
				description={pageDescription}
				showProgressBar={false}
			/>

			<CardContent className="w-full pb-10 flex flex-col">
				{type === "institution" ? (
					<InstitutionForm
						form={form as UseFormReturn<IInstitutionSchema>}
						submitBtnState={submitBtnState}
						onSubmit={onSubmit}
						setCountryCode={setCountryCode}
						countryCode={countryCode}
						institutionType={institutionType}
						setInstitutionType={setInstitutionType}
					/>
				) : null}

				{type === "patient" ? (
					<PatientForm
						form={form as UseFormReturn<IUserSchema>}
						submitBtnState={submitBtnState}
						onSubmit={onSubmit}
						setCountryCode={setCountryCode}
						countryCode={countryCode}
					/>
				) : null}
			</CardContent>

			<CardFooter className="flex flex-col">
				<p className="mt-2 text-sm text-center">
					Already have an account?{" "}
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
