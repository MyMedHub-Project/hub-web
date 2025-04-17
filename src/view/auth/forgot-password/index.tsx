"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "@/actions/forgotPassword";
import { Form } from "@/components/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Routes } from "@/core/routing";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { BtnStatus } from "@/types/types";
import { ErrorToast } from "@/view/auth/common/ErrorToast";
import { FormSubmitButton } from "@/view/auth/common/FormSubmitButton";
import { OnboardingViewHeader } from "@/view/auth/common/OnboardingViewHeader";
import TextFormField from "@/view/auth/common/TextFormField";
import {
	forgotPasswordDefault,
	forgotPasswordSchema,
	IForgotPasswordSchema
} from "@/view/auth/forgot-password/helper";

const ForgotPasswordView = () => {
	const router = useRouter();
	const { setDevToken, setEmail, setId } = useForgotPassword();

	const [submitBtnState, setSubmitBtnState] = useState<BtnStatus>("active");
	const [error, setError] = useState<string | null>(null);

	const form = useForm<IForgotPasswordSchema>({
		mode: "onBlur",
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: forgotPasswordDefault
	});

	const onSubmit = async (values: IForgotPasswordSchema) => {
		setError(null);
		setSubmitBtnState("loading");
		setEmail(values.email);

		const response = await forgotPassword({
			type: "email",
			email: values.email
		});
		if (response instanceof Error) {
			setError(response.message);
			setSubmitBtnState("active");
			return;
		}

		setId(response.id);
		response.devToken && setDevToken(response.devToken);

		router.push(Routes.AUTH.FORGOT_PASSWORD.VERIFICATION);
	};

	const pageTitle = "Forgot Password";
	const pageDescription =
		"Please enter the email address associated with your account.";

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
						<TextFormField
							form={form}
							name="email"
							label="Email"
							placeholder="john@doe.com"
							type="email"
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
					Remember your password?{" "}
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

export default ForgotPasswordView;
