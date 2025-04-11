"use client";

import React, { useContext, useEffect, useState } from "react";
import * as z from "zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheckIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { LogoSVGComponent, Spinner } from "@/components/icons";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import OnboardingContext from "@/app/auth/onboarding/onboarding-context";
import { PhoneInput } from "@/components/ui/phone-input";
import CountrySelect from "@/components/ui/country-select";
import RegionSelect from "@/components/ui/region-select";
import { handleSignUp } from "@/actions/sign-up-action";
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
	otherName: z
		.string()
		.trim()
		.max(80)
		.regex(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
		.optional(),
	email: z.string().trim().email().toLowerCase(),
	tel: z.string(),
	street: z.string(),
	city: z.string(),
	state: z.string(),
	country: z.string(),
	gender: z.string(),
	language: z.string(),
	dob: z.date({
		required_error: "A date of birth is required",
		invalid_type_error: "Select a valid date of birth"
	}),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." })
		.regex(
			/(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-z])(?=.*[A-Z])/,
			{
				message:
					"Password must include at least one number or symbol, one lowercase letter, and one uppercase letter."
			}
		)
});

export function DatePickerForm() {
	useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });
}

type FormValues = z.infer<typeof formSchema>;

const passwordFormats: Array<{ id: string; label: string; regex: RegExp }> = [
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

interface PassStrengthAnimationProps {
	password: string;
}

const PassStrengthAnimation: React.FC<PassStrengthAnimationProps> = ({
	password
}) => {
	const getStrength = (): number => {
		let strength = 0;
		passwordFormats.forEach((format) => {
			if (format.regex.test(password)) {
				strength += 1;
			}
		});
		return (strength / passwordFormats.length) * 100;
	};

	return (
		<div className="my-2 w-full">
			<motion.div
				className="h-1 bg-gray-200 rounded-full"
				initial={{ width: 100 }}
				animate={{ width: `${getStrength()}%` }}
				transition={{ duration: 0.5 }}
			>
				<motion.div
					className="h-full rounded-full"
					style={{
						background: `linear-gradient(90deg, 
              #ff4e50 0%,
              #f9d423 50%,
              #4caf50 100%
            )`
					}}
				/>
			</motion.div>
			<ul className="list-none space-y-1 text-sm mt-2">
				{passwordFormats.map((format) => (
					<li
						key={format.id}
						className={`flex items-center ${format.regex.test(password) ? "text-green-500" : "text-gray-500"}`}
					>
						<span className="mr-2">
							{format.regex.test(password) ? "✓" : "○"}
						</span>
						{format.label}
					</li>
				))}
			</ul>
		</div>
	);
};

const SignUpPage = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [countryCode, setCountryCode] = useState("");
	const { role, setVerificationData, termsAgreed, verificationData } =
		useContext(OnboardingContext);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			otherName: "",
			email: "",
			tel: "",
			street: "",
			city: "",
			state: "",
			country: "",
			gender: "",
			language: "",
			dob: "" as unknown as Date,
			password: ""
		}
	});

	const onSubmit = async (values: FormValues) => {
		const { countryName, countryShortCode } = JSON.parse(values.country);

		const userData = {
			type: role,
			email: values.email,
			countryCode: countryShortCode,
			phone: values.tel,
			firstname: values.firstName,
			lastname: values.lastName,
			otherNames: values.otherName,
			password: values.password,
			acceptedTerms: termsAgreed,
			language: values.language,
			institutionName: null,
			gender: values.gender.toLowerCase(),
			dob: format(values.dob, "yyyy-MM-dd"),
			address: {
				street: values.street,
				city: values.city,
				state: values.state,
				country: countryName
			}
		};

		setError(null);
		setIsLoading(true);

		const response = await handleSignUp(userData);

		if (response) {
			if (typeof response !== "string") {
				const {
					data: { token, user }
				} = response;

				setVerificationData({
					countryCode: countryShortCode,
					phone: user.phone,
					email: user.email,
					role: "patient"
				});

				/**
				 * @todo: will be removed for production
				 */
				localStorage.setItem(
					"token",
					JSON.stringify({
						email: token.emailToken,
						phone: token.phoneToken
					})
				);

				Cookies.set(
					"verificationData",
					JSON.stringify(verificationData),
					{ expires: 1 }
				);

				router.push(Routes.auth["verify-email"]);
			} else {
				const errMessage = response.split(":");

				const message =
					errMessage.length > 1
						? `${errMessage[0]}:${errMessage[1]}`
						: errMessage[0];

				setError(message);
			}
		}

		setIsLoading(false);
	};

	useEffect(() => {
		if (!termsAgreed) {
			router.push("/auth/onboarding");
		}
	});

	return (
		<Card className="w-[700px] my-5 border-none shadow-none">
			{error ? (
				<div className="w-full my-1 py-1 rounded bg-red-600 text-red-50 text-center text-sm">
					{error}
				</div>
			) : null}
			<CardHeader className="items-center">
				<LogoSVGComponent className="mb-3" />
				<CardTitle className="w-full text-2xl text-center font-bold pt-4 border-t-[3px]">
					Sign Up
				</CardTitle>
				<CardDescription className="text-xs">
					Please provide your personal information
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 flex flex-col"
					>
						<div className="grid grid-cols-2 gap-4">
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
								name="otherName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Other Names (optional)
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Ogbeni"
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
												type="email"
												placeholder="johndoe@gmail.com"
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
								name="tel"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<PhoneInput
												defaultCountry="NG"
												placeholder="Phone number"
												{...field}
												className="bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="dob"
								render={({ field }) => (
									<FormItem className="flex flex-col mt-2">
										<FormLabel>Date of Birth</FormLabel>
										<Popover>
											<PopoverTrigger
												asChild
												className="w-full px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
											>
												<FormControl>
													<Button
														variant="outline"
														className={cn(
															"w-full px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg",
															!field.value &&
																"text-muted-foreground"
														)}
													>
														{field.value ? (
															format(
																field.value,
																"dd/MM/yyy"
															)
														) : (
															<span className="text-sm">
																Pick a date
															</span>
														)}
														<CalendarCheckIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date > new Date() ||
														date <
															new Date(
																"1900-01-01"
															)
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Country</FormLabel>
										<CountrySelect
											onChange={(value) => {
												setCountryCode(
													JSON.parse(value)
														.countryShortCode
												);

												field.onChange(value);
											}}
											placeholder="Choose your country"
											className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem>
										<FormLabel>State</FormLabel>
										<RegionSelect
											countryCode={countryCode}
											onChange={field.onChange}
											placeholder="Choose your state"
											className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>City</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg">
													<SelectValue placeholder="Choose your city" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Lokoja">
													Lokoja
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="street"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Street</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your address"
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
								name="gender"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gender</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg">
													<SelectValue placeholder="Select gender" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem
													value="Male"
													defaultChecked
												>
													Male
												</SelectItem>
												<SelectItem value="Female">
													Female
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="language"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Language</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg">
													<SelectValue placeholder="English" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem
													value="en-US"
													defaultChecked
												>
													English (US)
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={
													showPassword
														? "text"
														: "password"
												}
												placeholder="*********"
												{...field}
												onChange={(e) => {
													field.onChange(e);
													setPassword(e.target.value);
												}}
												className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
											/>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="absolute right-0 top-0 h-full px-3 py-2"
												onClick={() =>
													setShowPassword(
														!showPassword
													)
												}
											>
												{showPassword ? (
													<EyeOff className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</Button>
										</div>
									</FormControl>
									<FormMessage />
									<PassStrengthAnimation
										password={password}
									/>
								</FormItem>
							)}
						/>

						<div className="space-y-5">
							<Button
								disabled={isLoading}
								className="w-full gap-x-2 bg-hubGreen hover:bg-hubGreen/95 disabled:bg-hubGreen/90 disabled:text-secondary"
								type="submit"
							>
								Continue
								{isLoading ? (
									<Spinner className="size-4" />
								) : null}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col">
				<p className="mt-2 text-sm text-center">
					Already have an account?{" "}
					<Link
						href={Routes.auth["sign-in"]}
						className="text-blue-500 hover:underline"
					>
						Log In
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default SignUpPage;
