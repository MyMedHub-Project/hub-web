"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { Button } from "@/components/button";
import { Label } from "@/components/form";
import {
	HospitalSVGComponent,
	LogoSVGComponent,
	PatientSVGComponent
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
import TermsModal from "./terms/terms-modal";

const OnboardingPage = ({}) => {
	const { role, setRole } = useContext(OnboardingContext);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-[600px] shadow-none border-none">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						Welcome to
					</CardTitle>
					<div className="flex justify-center">
						<LogoSVGComponent />
					</div>
				</CardHeader>
				<CardContent>
					<p className="text-center mb-5">
						Choose Your Role to Get Started
					</p>
					<RadioGroup
						onValueChange={(value: "patient" | "institution") =>
							setRole(value)
						}
						defaultValue="patient"
						className="grid grid-cols-2 gap-x-5"
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
				<CardFooter className="items-center justify-center">
					<div className="w-[350px] flex flex-col items-center gap-y-4">
						<p className="text-center font-light text-[#808080]">
							Join MyMedHub to access comprehensive healthcare
							services tailed to your needs
						</p>
						<Dialog>
							<DialogTrigger asChild>
								<Button
									className="w-full bg-[#068513]"
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
