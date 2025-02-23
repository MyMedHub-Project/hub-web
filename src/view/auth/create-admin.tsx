"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAdmin } from "@/actions/create-admin-action";
import OnboardingContext from "@/app/auth/onboarding/onboarding-context";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/form";
import { LogoSVGComponent, Spinner } from "@/components/icons";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Routes } from "@/core/routing";

const formSchema = z.object({
	firstName: z
		.string()
		.trim()
		.max(80)
		.regex(/^[A-Za-z]{2,}$/),
	lastName: z
		.string()
		.trim()
		.max(80)
		.regex(/^[A-Za-z]{2,}$/),
	email: z.string().email({
		message: "Please enter a valid email address."
	})
});

type FormValues = z.infer<typeof formSchema>;

const passwordFormats: Array<{
	id: string;
	label: string;
	regex: RegExp;
}> = [
	{ id: "length", label: "Atleast 8 characters", regex: /.{8,}/ },
	{
		id: "number & symbol",
		label: "Least one number (0-9) or symbol",
		regex: /[0-9!@#$%^&*(),.?":{}|<>]/
	},
	{
		id: "textcase",
		label: "Lowercase (a-z) and uppercase (A-Z)",
		regex: /(?=.*[a-z])(?=.*[A-Z])/
	}
];

const CreateAdminPage = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { verificationData } = useContext(OnboardingContext);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: ""
		}
	});

	const onSubmit = async (values: FormValues) => {
		setError(null);
		setIsLoading(true);

		// request doesnt return a response unless errror occurs
		const err = await createAdmin({
			onboardingToken: verificationData.onboardingToken,
			language: "en-US",
			...values
		});

		if (err) {
			const errMessage = err.split(":")[0];
			setError(errMessage);
			setIsLoading(false);
		} else router.push(Routes.auth["account-created"]);
	};

	return (
		<Card className=" w-[500px] mt-5 flex flex-col shadow-none border-none">
			{error ? (
				<div className="w-full my-1 py-1 rounded bg-red-600 text-red-50 text-center text-sm">
					{error}
				</div>
			) : null}
			<CardHeader className="justify-center space-y-4 items-center">
				<LogoSVGComponent width={300} height={40} />
				<CardTitle className="text-2xl font-semibold">
					Set Up Administrator
				</CardTitle>
				<CardDescription className="px-2">
					Begin by entering your information to register your health
					institution.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input
											placeholder="John"
											{...field}
											className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Doe"
											{...field}
											className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input
											placeholder="johndoe@gmail.com"
											{...field}
											className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={isLoading}
							className="w-full gap-x-2 bg-hubGreen hover:bg-hubGreen/95 disabled:bg-hubGreen/90 disabled:text-secondary"
							type="submit"
						>
							Continue
							{isLoading ? <Spinner className="size-4" /> : null}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col">
				<div className="text-sm text-center mt-4">
					Already have an account?{" "}
					<Link
						href={Routes.auth["sign-in"]}
						className="text-blue-600"
					>
						Log In
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
};

export default CreateAdminPage;
