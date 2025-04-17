"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/form";
import { Input } from "@/components/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader
} from "@/components/ui/card";

const formSchema = z.object({
	oldPassword: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." })
		.regex(
			/(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-z])(?=.*[A-Z])/,
			{
				message:
					"Password must include at least one number or symbol, one lowercase letter, and one uppercase letter."
			}
		),
	newPassword: z
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

type FormValues = z.infer<typeof formSchema>;

const Security = () => {
	const [showPassword, setShowPassword] = useState(false);

	const [password, setPassword] = useState<string>("");

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { oldPassword: "", newPassword: "" }
	});

	const onSubmit = (data: FormValues) => {
		console.log(data);
	};

	return (
		<Card className="bg-transparent shadow-none border-none">
			<CardHeader className="p-0 text-lg font-bold">Password</CardHeader>
			<CardDescription className="text-hub-black">
				Change or view you password
			</CardDescription>
			<CardContent className="pl-0 pt-5">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-3"
					>
						<FormField
							control={form.control}
							name="oldPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Old Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={
													showPassword
														? "text"
														: "password"
												}
												placeholder="*********"
												className="px-6 bg-hub-grey text-hub-black border-0 border-b-2 border-b-hub-grey200 focus:border-0 focus:border-b-2 focus:border-b-hub-green outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
												{...field}
												value={password}
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
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={
													showPassword
														? "text"
														: "password"
												}
												placeholder="*********"
												className="px-6 bg-hub-grey text-hub-black border-0 border-b-2 border-b-hub-grey200 focus:border-0 focus:border-b-2 focus:border-b-hub-green outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
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
								</FormItem>
							)}
						/>
						{/* <Button type="submit">Submit</Button> */}
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default Security;
