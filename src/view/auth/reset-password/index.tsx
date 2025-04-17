"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/actions/resetPassword";
import { Form } from "@/components/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Routes } from "@/core/routing";
import { useAsyncSafeguard } from "@/hooks/useAsyncSafeguard";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { BtnStatus } from "@/types/types";
import { ErrorToast } from "@/view/auth/common/ErrorToast";
import { FormSubmitButton } from "@/view/auth/common/FormSubmitButton";
import { OnboardingViewHeader } from "@/view/auth/common/OnboardingViewHeader";
import PasswordFormField from "@/view/auth/common/PasswordFormField";
import {
	IResetPasswordSchema,
	resetPasswordDefault,
	resetPasswordSchema
} from "@/view/auth/reset-password/helper";

const ResetPasswordView = () => {
	const router = useRouter();
	const { safeguard } = useAsyncSafeguard();
	const { id, setPasswordReset, tokenVerified } = useForgotPassword();

	const [submitBtnState, setSubmitBtnState] = useState<BtnStatus>("active");
	const [error, setError] = useState<string | null>(null);

	const form = useForm<IResetPasswordSchema>({
		mode: "onBlur",
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: resetPasswordDefault
	});

	const onSubmit = safeguard(async (values: IResetPasswordSchema) => {
		setError(null);
		setSubmitBtnState("loading");

		const response = await resetPassword({
			id,
			password: values.password
		});
		if (response instanceof Error) {
			setError(response.message);
			setSubmitBtnState("active");
			return;
		}

		setPasswordReset(true);
		router.push(Routes.AUTH.FORGOT_PASSWORD.SUCCESS);
		return;
	});

	const pageTitle = "Reset Password";
	const pageDescription = "Please create a new password for your account.";

	useEffect(() => {
		if (!tokenVerified) {
			router.push(Routes.AUTH.FORGOT_PASSWORD.ROOT);
			return;
		}
	}, [tokenVerified, router]);

	return (
		<Card className="flex-grow w-[450px] flex flex-col items-center justify-center my-5 border-none shadow-none max-sm:w-[85%] max-sm:justify-start">
			{error ? <ErrorToast error={error} /> : null}

			<OnboardingViewHeader
				title={pageTitle}
				description={pageDescription}
				showProgressBar={false}
			/>

			<CardContent className="w-full pb-10 flex flex-col max-sm:flex-grow">
				<Form {...form}>
					<form
						method="POST"
						className="flex flex-col gap-6"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<PasswordFormField
							form={form}
							placeholder="New Password"
							existingPassword={false}
						/>

						<FormSubmitButton
							loadingState={submitBtnState}
							label="Continue"
						/>
					</form>
				</Form>
			</CardContent>

			<CardFooter className="max-sm:mt-auto py-10">
				<p className="text-center">
					{"Return to "}
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

export default ResetPasswordView;
