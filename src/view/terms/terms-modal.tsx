import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Spinner, WhiteLogoSVGComponent } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import OnboardingContext from "@/app/auth/onboarding/onboarding-context";
import PatientTermsData from "./patient-terms-data";
// import DoctorTermsData from "./doctor-terms-data";
import InstitutionTermsData from "./institution-terms.data";
import { TermsType } from "./term-data-type";

const TermsModal = () => {
	const router = useRouter();
	const [termsData, setTermsData] = useState<TermsType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { role, setTermsAgreed, termsAgreed } = useContext(OnboardingContext);

	const handleClick = (btn: HTMLButtonElement) => {
		setIsLoading(true);
		if (!termsAgreed) {
			btn.disabled;
		} else {
			router.push(`/auth/onboarding/sign-up/${role}`);
		}
	};

	useEffect(() => {
		switch (role) {
			case "patient":
				setTermsData(PatientTermsData);
				break;
			// case "doctor":
			// 	setTermsData(DoctorTermsData);
			// 	break;
			case "institution":
				setTermsData(InstitutionTermsData);
				break;
			default:
				[];
		}
	}, [role]);

	return (
		<DialogContent className="min-w-[800px] h-full max-h-[550px] flex flex-col bg-hubGrey px-0 pt-0 rounded-3xl overflow-hidden">
			<DialogHeader className="bg-[#0D1717]  pt-5 pb-3">
				<div className="flex justify-center">
					<WhiteLogoSVGComponent />
				</div>
				<DialogTitle className="text-2xl font-bold text-center pt-5">
					Terms and Conditions
				</DialogTitle>
				<DialogDescription className="text-sm text-center">
					By signing up as a{" "}
					{role.charAt(0).toUpperCase() + role.slice(1)}, you agree to
					the following terms and conditons:
				</DialogDescription>
			</DialogHeader>

			<div className="flex-1 overflow-y-auto text-sm px-10 text-hubBlack">
				<ul className="space-y-2">
					{termsData.map((term, index) => (
						<li key={index}>
							<strong>{term.title}: </strong> {term.content}
						</li>
					))}

					<li>
						<strong>
							By clicking &ldquo;Agree&rdquo; or by using
							MyMedHub, you acknowledge that you have read,
							understood and agreed to these terms and conditions.
						</strong>
					</li>
				</ul>

				<div className="items-center flex pt-5 space-x-2">
					<Checkbox
						id="terms"
						checked={termsAgreed}
						onCheckedChange={() => setTermsAgreed(!termsAgreed)}
					/>
					<Label htmlFor="terms" className="text-xs font-semibold">
						I accept these Terms & Conditions
					</Label>
				</div>

				<DialogFooter className="mt-3.5">
					<Button
						className="w-1/2 gap-x-2 mx-auto bg-hubGreen hover:bg-hubGreen"
						disabled={!termsAgreed || isLoading}
						onClick={(e) =>
							handleClick(e.target as HTMLButtonElement)
						}
					>
						Continue
						{isLoading ? <Spinner className="size-4" /> : null}
					</Button>
				</DialogFooter>
			</div>
		</DialogContent>
	);
};

export default TermsModal;
