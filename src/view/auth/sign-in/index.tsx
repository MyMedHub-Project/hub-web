"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as _ from "lodash";
import { resolveLogin } from "@/actions/signIn";
import { Form } from "@/components/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Routes } from "@/core/routing";
import { BtnStatus } from "@/types/types";
import { ErrorToast } from "@/view/auth/common/ErrorToast";
import { FormSubmitButton } from "@/view/auth/common/FormSubmitButton";
import { OnboardingViewHeader } from "@/view/auth/common/OnboardingViewHeader";
import PasswordFormField from "@/view/auth/common/PasswordFormField";
import TextFormField from "@/view/auth/common/TextFormField";
import {
	ILoginSchema,
	loginDefault,
	loginSchema
} from "@/view/auth/sign-in/helper";
import { useSignIn } from "@/hooks/useSignIn";

export const SignInView = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [submitBtnState, setSubmitBtnState] = useState<BtnStatus>("active");
	const { setId, setToken, setTwoFactorRequired } = useSignIn();

	const form = useForm<ILoginSchema>({
		mode: "onBlur",
		resolver: zodResolver(loginSchema),
		defaultValues: loginDefault
	});

	const onSubmit = async (values: ILoginSchema) => {
		setError(null);
		setSubmitBtnState("loading");

		const response = await resolveLogin(values);
		if (response instanceof Error) {
			setError(response.message);
			setSubmitBtnState("active");
			return;
		}

		if (response && !_.isEmpty(response?.twoFactor)) {
			setTwoFactorRequired(true);
			setId(response.twoFactor?.id);
			setToken(response.twoFactor?.token);
			router.push(Routes.AUTH.SIGN_IN.VERIFICATION);
			return;
		}

		if (response && response?.cat && response?.refreshCat) {
			router.push(Routes.DASHBOARD.ROOT);
			return;
		}

		return;
	};

	return (
		<Card className="flex-grow w-[450px] flex flex-col items-center justify-center my-5 border-none shadow-none max-sm:w-[85%] max-sm:justify-start">
			{error ? <ErrorToast error={error} /> : null}

			<OnboardingViewHeader title="Login" />

			<CardContent className="w-full pb-10 flex flex-col">
				<Form {...form}>
					<form
						method="POST"
						className="flex flex-col gap-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<TextFormField
							form={form}
							name="email"
							label="Email Address"
							placeholder="john@doe.com"
							type="email"
						/>

						<PasswordFormField
							form={form}
							label="Password"
							showRules={false}
							showStrength={false}
							existingPassword={true}
						/>

						<div className="mt-3 max-sm:mt-0">
							<FormSubmitButton
								loadingState={submitBtnState}
								label="Log In"
							/>
						</div>

						<Link
							href={Routes.AUTH.FORGOT_PASSWORD.ROOT}
							className="text-hubBlue hover:underline"
						>
							Forgot Password
						</Link>
					</form>
				</Form>
			</CardContent>

			<CardFooter className="flex max-sm:mt-auto">
				<p className="text-center">
					{"Don't have an account? "}
					<Link
						href={Routes.AUTH.ONBOARDING.ROOT}
						className="text-hubBlue hover:underline "
					>
						Sign Up
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default SignInView;
