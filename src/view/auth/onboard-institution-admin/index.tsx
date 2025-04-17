"use client";

import { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { onboardInstitutionAdmin } from "@/actions/onboardInstitutionAdmin";
import OnboardingContext from "@/app/auth/onboarding/context";
import { Form } from "@/components/form";
import { Card, CardContent } from "@/components/ui/card";
import { Routes } from "@/core/routing";
import { ErrorToast } from "@/view/auth/common/ErrorToast";
import { FormSubmitButton } from "@/view/auth/common/FormSubmitButton";
import { OnboardingViewHeader } from "@/view/auth/common/OnboardingViewHeader";
import SelectFormField from "@/view/auth/common/SelectFormField";
import TextFormField from "@/view/auth/common/TextFormField";
import {
	IInstitutionAdminSchema,
	institutionAdminDefault,
	institutionAdminSchema
} from "@/view/auth/onboard-institution-admin/helper";
import { BtnStatus } from "@/types/types";

const OnboardInstitutionAdminView = () => {
	const router = useRouter();
	const { verificationData } = useContext(OnboardingContext);

	const [error, setError] = useState<string | null>(null);
	const [submitBtnState, setSubmitBtnState] = useState<BtnStatus>("active");

	const form = useForm<IInstitutionAdminSchema>({
		mode: "onBlur",
		resolver: zodResolver(institutionAdminSchema),
		defaultValues: institutionAdminDefault
	});

	const onSubmit = async (values: IInstitutionAdminSchema) => {
		setError(null);
		setSubmitBtnState("loading");

		const err = await onboardInstitutionAdmin({
			onboardingToken: verificationData?.onboardingToken || "",
			firstname: values.firstName,
			lastname: values.lastName,
			language: values.language
		});
		if (err instanceof Error) {
			setError(err.message);
			setSubmitBtnState("active");
			return;
		}

		return router.push(Routes.AUTH.ONBOARDING.SUCCESS);
	};

	useEffect(() => {
		if (
			!verificationData?.onboardingToken ||
			!(
				verificationData.onboardingToken &&
				verificationData.emailVerified &&
				verificationData.phoneVerified
			)
		) {
			router.push(Routes.AUTH.ONBOARDING.ROOT);
			return;
		}
	}, [verificationData, router]);

	return (
		<Card className="max-sm:w-[85%] w-[700px] my-5 border-none shadow-none max-sm:h-full">
			{error ? <ErrorToast error={error} /> : null}

			<OnboardingViewHeader
				title="Set Up Administrator"
				description="Please provide your administrator information"
				showProgressBar={false}
			/>

			<CardContent className="w-full pb-10 flex flex-col max-sm:flex-grow">
				<Form {...form}>
					<form
						className="flex flex-col gap-6"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<TextFormField
							form={form}
							name="firstName"
							label="First Name"
							placeholder="John"
						/>

						<TextFormField
							form={form}
							name="lastName"
							label="Last Name"
							placeholder="Doe"
						/>

						<SelectFormField
							form={form}
							name="language"
							label="Language"
							options={[
								{
									value: "en-US",
									label: "English (US)"
								}
							]}
							placeholder="Select language"
						/>

						<div className="pt-3">
							<FormSubmitButton
								label="Create Account"
								loadingState={submitBtnState}
							/>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default OnboardInstitutionAdminView;
