"use client";

import { Eye, EyeOff } from "lucide-react";
import { memo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/form";
import { Input } from "@/components/input";
import PasswordStrength from "@/view/auth/common/PasswordStrength";

interface PasswordFormFieldProps {
	form: UseFormReturn<any>;
	label?: string;
	placeholder?: string;
	showRules?: boolean;
	showStrength?: boolean;
	existingPassword?: boolean;
}

const PasswordFormField = ({
	existingPassword = true,
	form,
	label,
	placeholder,
	showRules = true,
	showStrength = true
}: PasswordFormFieldProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState<string>("");

	return (
		<FormField
			control={form.control}
			name="password"
			render={({ field }) => (
				<FormItem>
					{label ? (
						<FormLabel className="max-sm:text-sm text-md font-normal max-sm:text-muted-foreground max-sm:hidden">
							{label}
						</FormLabel>
					) : null}

					<FormControl>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								placeholder={placeholder ?? "*********"}
								{...field}
								onChange={(e) => {
									field.onChange(e);
									setPassword(e.target.value);
								}}
								className="px-6 bg-hub-grey text-hub-black border-0 border-b-2 border-b-hub-grey200 focus:border-0 focus:border-b-2 focus:border-b-hub-green outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
								autoComplete={
									existingPassword
										? "current-password"
										: "new-password"
								}
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute right-0 top-0 h-full px-3 py-2"
								onClick={() => setShowPassword(!showPassword)}
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
					{showRules || showStrength ? (
						<PasswordStrength
							password={password}
							showRules={showRules}
						/>
					) : null}
				</FormItem>
			)}
		/>
	);
};

export default memo(PasswordFormField);
