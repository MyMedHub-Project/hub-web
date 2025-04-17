"use client";

import { motion } from "framer-motion";
import { LogoSVGComponent } from "@/components/icons";
import { MobileLogoSVGComponent } from "@/components/icons/mobile";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderState } from "@/types/types";
import ProgressBar from "@/view/auth/common/ProgressBar";

export interface OnboardingViewHeaderProps {
	title: string;
	description?: string;
	showProgressBar?: boolean;
	progressBarState?: LoaderState;
}

export const OnboardingViewHeader = ({
	description,
	progressBarState,
	showProgressBar = false,
	title
}: OnboardingViewHeaderProps) => (
	<CardHeader className="justify-center items-center max-sm:w-full">
		<motion.div
			className="py-5"
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div>
				<LogoSVGComponent
					className="max-sm:hidden block"
					width={300}
					height={40}
				/>

				<MobileLogoSVGComponent className="hidden max-sm:block" />
			</div>
		</motion.div>

		<CardTitle className="px-0 py-2 text-4xl font-semibold max-sm:self-start max-sm:text-xl">
			{title}
		</CardTitle>

		{showProgressBar ? (
			<ProgressBar isVerified={progressBarState === "verified"} />
		) : null}

		{description ? (
			<CardDescription className="px-0 py-2 text-center text-md font-normal max-sm:self-start max-sm:text-start">
				{description}
			</CardDescription>
		) : null}
	</CardHeader>
);
