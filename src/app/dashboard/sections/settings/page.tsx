"use client";

import { Button } from "@/components/button";
import { Separator } from "@/components/ui/separator";
import { ToggleLeftIcon } from "lucide-react";
import React, { useState } from "react";

const Settings = () => {
	const [isActive, setIsActive] = useState("");
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
					<div className="flex flex-col m-6" key={item.title}>
						<h2 className="text-base font-bold leading-normal">
							{item.title}
						</h2>
						<p className="text-sm">{item.description}</p>
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
