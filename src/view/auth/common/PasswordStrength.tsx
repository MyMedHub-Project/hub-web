"use client";

import React from "react";
import { memo } from "react";
import { motion } from "framer-motion";

interface PassStrengthAnimationProps {
	password: string;
	showRules?: boolean;
}

export const passwordFormats: Array<{
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

export const getStrength = (password: string): number => {
	let strength = 0;
	passwordFormats.forEach((format) => {
		if (format.regex.test(password)) {
			strength += 1;
		}
	});
	return (strength / passwordFormats.length) * 100;
};

const PasswordStrength = ({
	password,
	showRules = true
}: PassStrengthAnimationProps) => (
	<div className="my-2 w-full">
		<motion.div
			className="h-1 bg-gray-200 rounded-full"
			initial={{ width: 100 }}
			animate={{ width: `${getStrength(password)}%` }}
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

		{showRules ? (
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
		) : null}
	</div>
);

export default memo(PasswordStrength);
