"use client";

import Link from "next/link";
import { useContext } from "react";
import { motion } from "framer-motion";
import OnboardingContext from "@/app/auth/onboarding/context";
import { Button } from "@/components/button";
import { Label } from "@/components/form";
import {
	HospitalSVGComponent,
	LogoSVGComponent,
	PatientSVGComponent
} from "@/components/icons";
import { MobileLogoSVGComponent } from "@/components/icons/mobile";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Routes } from "@/core/routing";
import TermsModal from "@/view/auth/common/TermsModal";

const OnboardingView = () => {
	const { role, setRole } = useContext(OnboardingContext);

	// Todo: scale down for screen less than 327px

	return (
		<Card className="flex-grow flex flex-col items-center justify-center my-5 border-none shadow-none text-md max-sm:w-[85%] max-sm:justify-start">
			<CardHeader className="justify-center items-center gap-2 mt-[45px] max-sm:w-full">
				<CardTitle className="text-md font-bold text-center">
					Welcome to
				</CardTitle>

				<motion.div
					className=""
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
				>
					<LogoSVGComponent
						className="block max-sm:hidden"
						width={300}
						height={40}
					/>

					<MobileLogoSVGComponent className="hidden max-sm:block" />
				</motion.div>
			</CardHeader>

			<CardContent className="w-full flex flex-col items-center gap-7 max-sm:flex-grow">
				<p className="text-center">Choose Your Role to Get Started</p>

				<RadioGroup
					onValueChange={(value: "patient" | "institution") =>
						setRole(value)
					}
					defaultValue="patient"
					className="w-full flex max-sm:flex-col items-center justify-center gap-5"
				>
					<Card
						className={cn(
							"rounded-3xl h-[153px] w-[327px]",
							role === "patient" &&
								"border-hubPurple/50 border-2 drop-shadow-lg"
						)}
					>
						<RadioGroupItem
							value="patient"
							id="patient"
							className="sr-only "
						/>
						<Label
							htmlFor="patient"
							className="w-full h-[140px] py-3.5 flex flex-col items-center justify-center cursor-pointer"
						>
							<PatientSVGComponent className="size-20" />
							<p className="mt-3 font-semibold opacity-95">
								Patient
							</p>
						</Label>
					</Card>

					<Card
						className={cn(
							"rounded-3xl h-[153px] w-[327px]",
							role === "institution" &&
								"border-hubOrange/50 border-2 drop-shadow-lg"
						)}
					>
						<RadioGroupItem
							value="institution"
							id="institution"
							className="sr-only"
						/>
						<Label
							htmlFor="institution"
							className="w-full h-[140px] py-3.5 flex flex-col items-center justify-center cursor-pointer"
						>
							<HospitalSVGComponent className="size-20" />
							<p className="mt-3 font-semibold opacity-95">
								Health Institution
							</p>
						</Label>
					</Card>
				</RadioGroup>

				<div className="w-[400px] flex flex-col items-center gap-6 max-sm:mt-auto max-sm:w-full">
					<p className="text-center text-[#808080]">
						Join MyMedHub to access comprehensive healthcare
						services tailed to your needs
					</p>

					<Dialog>
						<DialogTrigger asChild>
							<Button
								className="w-full bg-[#068513] h-12"
								disabled={!role}
							>
								Next
							</Button>
						</DialogTrigger>

						<TermsModal />
					</Dialog>
				</div>
			</CardContent>

			<CardFooter className="max-sm:pb-10 max-sm:mt-auto">
				<p className="text-center">
					Already have an account?{" "}
					<Link
						href={Routes.AUTH.SIGN_IN.ROOT}
						className="text-blue-600 hover:underline"
					>
						Log In
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default OnboardingView;
