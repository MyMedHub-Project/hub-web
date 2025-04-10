"use client";

import Link from "next/link";
import React, { useContext } from "react";
import TermsModal from "./terms/terms-modal";
import { Button } from "@/components/button";
import { Label } from "@/components/form";
import {
	HospitalSVGComponent,
	LogoSVGComponent,
	PatientSVGComponent,
	LogoSVGComponentMobile
} from "@/components/icons";
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
import OnboardingContext from "@/app/auth/onboarding/onboarding-context";

const OnboardingPage = ({}) => {
	const { role, setRole } = useContext(OnboardingContext);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-[600px] shadow-none border-none gap-y-6">
				<CardHeader className="max-sm:gap-6">
					<div className="flex flex-col gap-y-1">
						<CardTitle className=" max-sm:text-[14px] text-2xl font-bold text-center">
							Welcome to
						</CardTitle>

						<div className="flex justify-center">
							<span className="max-sm:hidden">
								<LogoSVGComponent />
							</span>
							<span className="hidden max-sm:block">
								<LogoSVGComponentMobile />
							</span>
						</div>
					</div>

					<p className="max-sm:text-[14px] text-center">
						Choose Your Role to Get Started
					</p>
				</CardHeader>
				<CardContent className="py-0 max-sm:flex flex-col items-center">
					<RadioGroup
						onValueChange={(value: "patient" | "institution") =>
							setRole(value)
						}
						defaultValue="patient"
						className="grid max-sm:grid-cols-1 max-sm:w-[85%] max-sm:max-w-[327px] grid-cols-2 gap-5 items-center"
					>
						<Card
							className={cn(
								"rounded-2xl shadow-none border",
								role === "patient" && "border-hubPurple/50"
							)}
						>
							<RadioGroupItem
								value="patient"
								id="patient"
								className="sr-only"
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
								"rounded-2xl shadow-none border",
								role === "institution" && "border-hubOrange/50"
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
				</CardContent>
				<CardFooter className="items-center justify-center max-sm:text-[14px]">
					<div className="w-[350px] flex flex-col items-center gap-y-4 max-sm:gap-y-6 max-sm:pt-10">
						<p className="max-sm:text-[12px] text-center font-light text-[#808080]">
							Join MyMedHub to access comprehensive healthcare
							services tailed to your needs
						</p>

						<Dialog>
							<DialogTrigger asChild>
								<Button
									className="max-sm:w-[85%] w-full bg-[#068513]"
									disabled={!role}
								>
									Next
								</Button>
							</DialogTrigger>
							<TermsModal />
						</Dialog>

						<p>
							Already have an account?{" "}
							<Link
								href="/auth/sign-in"
								className="text-blue-600 hover:underline"
							>
								Log In
							</Link>
						</p>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default OnboardingPage;
