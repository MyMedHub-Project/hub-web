"use client";

import React, { useState } from "react";
import * as z from "zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Card,
	CardContent,
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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address."
	}),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." })
		.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
			message:
				"Password must include at least one number, one lowercase and one uppercase letter."
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

const SignInPage: React.FC = () => {
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
				<CardTitle className="text-2xl font-bold pt-5">Login</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
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
							<Link
								href="/"
								className="text-sm font-semibold text-blue-500 hover:underline"
							>
								Forgot Password
							</Link>
							<Button
								className="w-full bg-green-600 hover:bg-green-500"
								type="submit"
							>
								Log In
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col">
				<p className="mt-2 text-sm text-center">
					Don&apos;t have an account?{" "}
					<Link href="/" className="text-blue-500 hover:underline">
						Sign Up
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default SignInPage;
