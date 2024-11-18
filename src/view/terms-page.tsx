"use client";

import { Button } from "@/components/button";
import { Label } from "@/components/form";
import { LogoSVGComponent } from "@/components/icons";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const TermsPage = () => {
	const [accepted, setAccepted] = useState(false);
	const searchParams = useSearchParams();
	const role = searchParams.get("role");

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-[300px]">
				<CardHeader className="bg-[#0D1717]">
					<div className="flex justify-center">
						<LogoSVGComponent />
					</div>
					<CardTitle className="text-2xl font-bold text-center pt-5">
						Terms and Conditions
					</CardTitle>
					<p className="text-sm text-center">
						By signing up as a {role}, you agree to the following
						terms and conditons:
					</p>
				</CardHeader>
				<CardContent className="h-[300px] overflow-y-auto text-sm">
					<ul className="list-disc pl-5 space-y-2 mt-2">
						<li>
							<strong>Privacy and Security:</strong> Your privacy
							and security are our top priorities. We are
							committed to protecting your personal and health
							information by industry standards and regulations.
						</li>
						<li>
							<strong>Accuracy of Information:</strong> You agree
							to provide accurate and up-to-date information about
							yourself during the registration process. This
							includes personal details, medical history, and any
							other information required for effective healthcare
							management.
						</li>
						<li>
							<strong>Responsibility for Account:</strong> You are
							responsible for maintaining the confidentiality of
							your account credentials and for any activities that
							occur under your account. Notify us immediately if
							you suspect unauthorised access or use of your
							account.
						</li>
						<li>
							<strong>Communication:</strong> By registering with
							MyMedHub, you consent to receive communications from
							us, including appointment reminders, notifications
							about test results, and other relevant healthcare
							information.
						</li>
						<li>
							<strong>
								Collaboration with Healthcare Providers:
							</strong>{" "}
							MyMedHub facilitates communication and collaboration
							between patients and healthcare providers. By using
							our platform, you agree to engage in respectful and
							professional interactions with healthcare
							professionals.
						</li>
						<li>
							<strong>Feedback and Suggestions:</strong> We value
							your feedback and suggestions for improving our
							platform. Feel free to share your thoughts with us
							at any time.
						</li>
						<li>
							<strong>Termination of Account:</strong> MyMedHub
							reserves the right to terminate or suspend your
							account if you violate these terms and conditions or
							engage in any behaviour that compromises the
							security or intergrity of our platform.
						</li>
						<li>
							<strong>
								By clicking "Agree" or by using MyMedHub, you
								acknowledge that you have read, understood and
								agreed to these terms and conditions.
							</strong>
						</li>
					</ul>

					<div className="items-center flex pt-5 space-x-2">
						<Checkbox
							id="terms"
							checked={accepted}
							onCheckedChange={(checked) =>
								setAccepted(checked as boolean)
							}
						/>
						<Label
							htmlFor="terms"
							className="text-xs font-semibold"
						>
							I accept these Terms & Conditions
						</Label>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<Button
						asChild
						className="w-full bg-[#068513]"
						disabled={!accepted}
					>
						<Link href={`/signup?role=${role}`}>Continue</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default TermsPage;
