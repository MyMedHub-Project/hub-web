"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";

const NewPassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<Card className="w-[500px] mx-auto text-center">
			<CardHeader>
				<CardTitle className="text-xl font-bold">
					Create new password
				</CardTitle>
				<CardContent className="space-y-4">
					<span className="text-xs text-gray-500">
						Please create a new password for your MyMedHub account.
					</span>
					<div className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							placeholder="New Password"
							className="pr-10"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-0 flex items-center pr-3"
						>
							{showPassword ? (
								<EyeOffIcon className="h-4 w-4 text-gray-400" />
							) : (
								<EyeIcon className="h-4 w-4 text-gray-400" />
							)}
						</button>
					</div>
					<div className="relative">
						<Input
							type={showConfirmPassword ? "text" : "password"}
							placeholder="Confirm New Password"
							className="pr-10"
						/>
						<button
							type="button"
							onClick={() =>
								setShowConfirmPassword(!showConfirmPassword)
							}
							className="absolute inset-y-0 right-0 flex items-center pr-3"
						>
							{showConfirmPassword ? (
								<EyeOffIcon className="h-4 w-4 text-gray-400" />
							) : (
								<EyeIcon className="h-4 w-4 text-gray-400" />
							)}
						</button>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						type="submit"
						className="w-full bg-green-600 hover:bg-green-500"
					>
						Done
					</Button>
				</CardFooter>
			</CardHeader>
		</Card>
	);
};

export default NewPassword;
