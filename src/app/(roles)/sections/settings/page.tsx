"use client";

import { Eye, EyeOff, Mail, Phone, ToggleLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/button";
import { Label } from "@/components/form";
import { Input } from "@/components/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
	const [isActive, setIsActive] = useState("");
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	const notifications = [
		{
			title: "Push Notifications",
			content: "Enable Push Notifications",
			id: 1
		},
		{
			title: "Email Notifications",
			content: "Receive Email Notifications",
			id: 2
		},
		{
			title: "SMS Notifications",
			content: "Receive SMS Notifications",
			id: 3
		}
	];
	const passwordSetting = [
		{
			title: "Password",
			description: "Change or view your password"
		}
	];
	const passwordRecovery = [
		{
			title: "Password Recovery",
			description:
				"Choose where you would like to receive the code to reset your password when required."
		}
	];

	const renderItem = () => {
		switch (isActive) {
			case "notifications":
				return notifications.map((item) => (
					<div className="flex flex-col m-6" key={item.id}>
						<p className="text-xs leading-loose text-gray-400 pb-4">
							{item.title}
						</p>
						<div className="flex justify-between">
							<span className="text-hubBlack text-medium">
								{item.content}
							</span>
							<ToggleLeftIcon />
						</div>
					</div>
				));
			case "passwordRecovery":
				return passwordRecovery.map((item) => (
					<div
						className="flex flex-col mt-4 space-y-4"
						key={item.title}
					>
						<div className="space-y-1">
							<h2 className="text-lg font-semibold">
								{item.title}
							</h2>
							<p className="text-sm text-muted-foreground">
								{item.description}
							</p>
						</div>
						<RadioGroup defaultValue="email" className="space-y-2">
							<div className="flex items-center space-x rounded-md border p-4 data-[state=checked]:bg-green-50 data-[state=checked]:border-green-100">
								<RadioGroupItem
									value="email"
									id="email"
									className="border-green-500"
								/>
								<Label
									htmlFor="email"
									className="flex flex-1 items-center justify-between"
								>
									<div className="space-y-1">
										<div className="flex items-center space-x-2">
											<Mail className="h-4 w-4" />
											<span className="font-medium">
												Email
											</span>
										</div>
										<p className="text-sm text-muted-foreground">
											Your password reset code would be
											sent to johndoe@exmaple.com
										</p>
									</div>
								</Label>
							</div>

							<div className="flex items-center space-x rounded-md border p-4 data-[state=checked]:bg-green-50 data-[state=checked]:border-green-100">
								<RadioGroupItem
									value="phone"
									id="phone"
									className="border-green-500"
								/>
								<Label
									htmlFor="phone"
									className="flex flex-1 items-center justify-between"
								>
									<div className="space-y-1">
										<div className="flex items-center space-x-2">
											<Phone className="h-4 w-4" />
											<span className="font-medium">
												Phone Number
											</span>
										</div>
										<p className="text-sm text-muted-foreground">
											Your password reset code would be
											sent to{" "}
											<strong>+234818123456789</strong>
										</p>
									</div>
								</Label>
							</div>
						</RadioGroup>
					</div>
				));
			case "passwordSetting":
				return passwordSetting.map((item) => (
					<div
						className="flex flex-col mt-4 space-y-4"
						key={item.title}
					>
						<div className="space-y-1">
							<h2 className="text-lg font-semibold">
								{item.title}
							</h2>
							<p className="text-sm text-muted-foreground">
								{item.description}
							</p>
						</div>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="old-password">
									Old Password
								</Label>
								<div className=" relative">
									<Input
										id="old-password"
										type={
											showOldPassword
												? "text"
												: "password"
										}
										className="pr-10 bg-muted"
										placeholder="********"
									/>
									<Button
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
										onClick={() =>
											setShowOldPassword(!showOldPassword)
										}
									>
										{showOldPassword ? (
											<EyeOff className="h-4 w-4 text-muted-foreground" />
										) : (
											<Eye className="h-4 w-4 text-muted-foreground" />
										)}
										<span className="sr-only">
											{showOldPassword
												? "Hide password"
												: "Show password"}
										</span>
									</Button>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="new-password">
									New Password
								</Label>
								<div className=" relative">
									<Input
										id="new-password"
										type={
											showNewPassword
												? "text"
												: "password"
										}
										className="pr-10 bg-muted"
										placeholder="********"
									/>
									<Button
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
										onClick={() =>
											setShowNewPassword(!showNewPassword)
										}
									>
										{showNewPassword ? (
											<EyeOff className="h-4 w-4 text-muted-foreground" />
										) : (
											<Eye className="h-4 w-4 text-muted-foreground" />
										)}
										<span className="sr-only">
											{showNewPassword
												? "Hide password"
												: "Show password"}
										</span>
									</Button>
								</div>
							</div>
						</div>
					</div>
				));

			default:
				return null;
		}
	};

	return (
		<div className="max-w-2xl p-4">
			<nav className="flex items-center gap-2 mb-4 text-sm text-hubGrey200">
				<Button
					variant="ghost"
					className={`transition-colors px-4 py-2 rounded-md ${isActive === "notifications" ? "bg-hubGreen text-white" : "hover:text-gray-900"}`}
					onClick={() => setIsActive("notifications")}
				>
					Notifications
				</Button>
				<Button
					variant="ghost"
					className={`transition-colors px-4 py-2 rounded-md ${isActive === "passwordSetting" ? "bg-hubGreen text-white" : "hover;text-gray-900"}`}
					onClick={() => setIsActive("passwordSetting")}
				>
					Security
				</Button>

				<Button
					variant="ghost"
					className={`transition-colors px-4 py-2 rounded-md ${isActive === "passwordRecovery" ? "bg-hubGreen text-white" : "hover:text-gray-900"}`}
					onClick={() => setIsActive("passwordRecovery")}
				>
					Password Recovery
				</Button>
			</nav>
			<Separator />
			<div className="max-w-2xl mx-auto flex flex-col">
				{renderItem()}
			</div>
		</div>
	);
};

export default Settings;
