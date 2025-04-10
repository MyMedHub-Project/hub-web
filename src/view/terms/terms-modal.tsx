import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import PatientTermsData from "./patient-terms-data";
import InstitutionTermsData from "./institution-terms.data";
import { TermsType } from "./term-data-type";
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
import { MobileWhiteLogoSVGComponent } from "@/components/icons/mobile";
// import DoctorTermsData from "./doctor-terms-data";

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
		<DialogContent className="max-sm:w-full max-sm:rounded-none max-sm:rounded-t-3xl max-sm:h-[90%] max-sm:my-auto max-sm:bottom-0 max-sm:top-auto max-sm:translate-y-0 w-[80%] max-w-[900px] h-[550px] flex flex-col px-0 p-0 rounded-3xl overflow-hidden gap-0 border-none">
			<DialogHeader className="bg-[#0D1717] pt-10 pb-7 gap-4">
				<div className="flex justify-center">
					<span className="max-sm:hidden">
						<WhiteLogoSVGComponent />
					</span>
					<span className="hidden max-sm:block">
						<MobileWhiteLogoSVGComponent />
					</span>
				</div>

				<DialogTitle className="max-sm:text-[20px] text-4xl font-bold text-center">
					Terms and Conditions
				</DialogTitle>

				<DialogDescription className="max-sm:text-[14px] max-sm:w-[80%] mx-auto text-md text-center">
					By signing up as a{" "}
					{role.charAt(0).toUpperCase() + role.slice(1)}, you agree to
					the following terms and conditons:
				</DialogDescription>
			</DialogHeader>

			<div className="flex-1 overflow-y-auto text-sm p-6 text-hubBlack bg-hubGrey">
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

				<DialogFooter className="mt-5">
					<Button
						className="max-sm:w-full w-1/2 gap-x-2 mx-auto bg-hubGreen hover:bg-hubGreen"
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
