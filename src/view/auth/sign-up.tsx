"use client";

import React, { useState } from "react";
import * as z from "zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { LogoSVGComponent } from "@/components/icons";
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
import { CalendarCheckIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
	firstName: z
		.string()
		.trim()
		.max(80)
		.regex(/^(?=\S{2,})(?!\d)\S+ \S{2,}(?!\d)$/),
	lastName: z
		.string()
		.trim()
		.max(80)
		.regex(/^(?=\S{2,})(?!\d)\S+ \S{2,}(?!\d)$/),
	otherName: z
		.string()
		.trim()
		.max(80)
		.regex(/^(?=\S{2,})(?!\d)\S+ \S{2,}(?!\d)$/),
	email: z.string().trim().email().toLowerCase(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." })
		.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
			message:
				"Password must include at least one number, one lowercase and one uppercase letter."
		}),
	dob: z.date({
		required_error: "A date of birth is required"
	})
});

export function DatePickerForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(formSchema)
	});
}

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
		regex: /\d/
	},
	{
		id: "textcase",
		label: "Lowercase (a-z) and uppercase (A-Z)",
		regex: /({a-z}), ({A-Z})/
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

const SignUpPage: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState<string>("");

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	function onSubmit(values: FormValues) {
		console.log(values);
	}

	return (
		<Card className=" w-[500px] flex flex-col">
			<CardHeader className="items-center">
				<LogoSVGComponent />
				<CardTitle className="text-2xl font-bold pt-5">
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
						<div className="grid grid-cols-2 gap-3 ">
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
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Doe"
												{...field}
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
											<Input
												placeholder="johndoe@gmail.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Street</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your address"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>City</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
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
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>State</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Choose your city" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Lokoja">
													Kogi
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Country</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Choose your city" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Lokoja">
													Nigeria
												</SelectItem>
											</SelectContent>
										</Select>
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
												<SelectTrigger>
													<SelectValue placeholder="Choose your city" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem
													value="Lokoja"
													defaultChecked
												>
													Male
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
												<SelectTrigger>
													<SelectValue placeholder="English" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem
													value="English"
													defaultChecked
												>
													English
												</SelectItem>
											</SelectContent>
										</Select>
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
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-[240px] pl-3 text-left font-normal",
															!field.value &&
																"text-muted-foreground"
														)}
													>
														{field.value ? (
															format(
																field.value,
																"PPP"
															)
														) : (
															<span>
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
								className="w-full bg-green-600 hover:bg-green-500"
								type="submit"
							>
								Continue
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col">
				<p className="mt-2 text-sm text-center">
					Already have an account?{" "}
					<Link
						href="/auth/onboarding/sign-in"
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
