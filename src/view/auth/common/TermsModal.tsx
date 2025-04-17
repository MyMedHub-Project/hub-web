import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import OnboardingContext from "@/app/auth/onboarding/context";
import { WhiteLogoSVGComponent } from "@/components/icons";
import { MobileWhiteLogoSVGComponent } from "@/components/icons/mobile";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Routes } from "@/core/routing";
import { BtnStatus } from "@/types/types";
import { SubmitButton } from "./SubmitButton";

export interface TermsType {
	title: string;
	content: string;
}

const TermsModal = () => {
	const router = useRouter();
	const [termsContent, setTermsContent] = useState<TermsType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { role, setTermsAgreed, termsAgreed } = useContext(OnboardingContext);

	const handleClick = (btn: HTMLButtonElement) => {
		setIsLoading(true);
		if (!termsAgreed) {
			btn.disabled;
		} else {
			router.push(`${Routes.AUTH.ONBOARDING.ROOT}/${role}`);
		}
	};

	useEffect(() => {
		switch (role) {
			case "patient":
				setTermsContent(PatientTermsContent);
				break;
			// case "doctor":
			// 	setTermsContent(DoctorTermsContent);
			// 	break;
			case "institution":
				setTermsContent(InstitutionTermsContent);
				break;
			default:
				[];
		}
	}, [role]);

	let btnLoadingState: BtnStatus = "disabled";
	if (isLoading) btnLoadingState = "loading";
	if (!termsAgreed) btnLoadingState = "disabled";
	if (termsAgreed) btnLoadingState = "active";
	if (isLoading && termsAgreed) btnLoadingState = "loading";

	return (
		<DialogContent className="max-sm:w-full max-sm:rounded-none max-sm:rounded-t-xl max-sm:h-[90%] max-sm:my-auto max-sm:bottom-0 max-sm:top-auto max-sm:translate-y-0 w-[80%] max-w-[900px] h-[550px] flex flex-col px-0 p-0 rounded-[30px] overflow-hidden gap-0 border-none">
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
					{termsContent.map((term, index) => (
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

				<div className="max-sm:w-full w-[60%] mx-auto mt-5">
					<SubmitButton
						loadingState={btnLoadingState}
						onClick={(e) =>
							handleClick(e.target as HTMLButtonElement)
						}
						label="Continue"
					/>
				</div>
			</div>
		</DialogContent>
	);
};

export default TermsModal;

/**
 *
 *
 *   Terms Content
 *
 *
 */

export const InstitutionTermsContent = [
	{
		title: "Compliance with Regulations",
		content:
			"You agree to comply with all applicable laws, regulations, and standards governing healthcare delivery, patient privacy, and data security."
	},
	{
		title: "Data Management",
		content:
			"As a health institution, you are responsible for managing patient data securely and ensuring that access to patient records is restricted to authorized personnel only."
	},
	{
		title: "Collaboration with Healthcare Providers",
		content:
			"MyMedHub facilitates collaboration between health institutions and healthcare providers. You agree to engage in professional and collaborative communication with healthcare providers to deliver coordinated care to patients."
	},
	{
		title: "Responsibility for Account",
		content:
			"You are responsible for maintaining the security of your account credentials and for any activities that occur under your account. Notify us immediately if you suspect unauthorised access or use of your account."
	},
	{
		title: "Communication with Healthcare Providers",
		content:
			"MyMedHub facilitates communication and collaboration between patients and healthcare providers. By using our platform, you agree to engage in respectful and professional interactions with healthcare professionals."
	},
	{
		title: "Feedback and Improvement",
		content:
			"We value your feedback and suggestions for improving our platform. Your insights are essential in helping us enhance the user experience for both health institutions and patients."
	},
	{
		title: "Termination of Account",
		content:
			"MyMedHub reserves the right to terminate or suspend your account if you violate these terms and conditions or engage in any behaviour that compromises the security or integrity of our platform."
	}
];

export const PatientTermsContent = [
	{
		title: "Privacy and Security",
		content:
			"Your privacy and security are our top priorities. We are committed to protecting your personal and health information by industry standards and regulations."
	},
	{
		title: "Accuracy of Information",
		content:
			"You agree to provide accurate and up-to-date information about yourself during the registration process. This includes personal details, medical history, and any other information required for effective healthcare management."
	},
	{
		title: "Responsibility for Account",
		content:
			"You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account. Notify us immediately if you suspect unauthorised access or use of your account."
	},
	{
		title: "Communication",
		content:
			"By registering with MyMedHub, you consent to receive communications from us, including appointment reminders, notifications about test results, and other relevant healthcare information."
	},
	{
		title: "Collaboration with Healthcare Providers",
		content:
			"MyMedHub facilitates communication and collaboration between patients and healthcare providers. By using our platform, you agree to engage in respectful and professional interactions with healthcare professionals."
	},
	{
		title: "Feedback and Suggestions",
		content:
			"We value your feedback and suggestions for improving our platform. Feel free to share your thoughts with us at any time."
	},
	{
		title: "Termination of Account",
		content:
			"MyMedHub reserves the right to terminate or suspend your account if you violate these terms and conditions or engage in any behaviour that compromises the security or integrity of our platform."
	}
];

// export const DoctorTermsContent = [
// 	{
// 		title: "Privacy and Confidentiality",
// 		content:
// 			"As a healthcare provider, you are bound by strict confidentiality obligations. You agree to uphold patient privacy and confidentiality at all times and to comply with all applicable privacy laws and regulations."
// 	},
// 	{
// 		title: "Professionalism",
// 		content:
// 			"You agree to provide professional and compassionate care to patients using MyMedHub. This includes timely responses to patient inquiries, accurate documentation of medical records, and adherence to ethical standards of practice."
// 	},
// 	{
// 		title: "Collaboration with Patients",
// 		content:
// 			"MyMedHub facilitates collaboration between healthcare providers and patients. You agree to engage in respectful and patient-centred communication with patients, involving them in their healthcare decisions and treatment plans."
// 	},
// 	{
// 		title: "Security of Information",
// 		content:
// 			"You are responsible for safeguarding patient information and for ensuring that access to patient records is restricted to authorized personnel only. Any breach of patient confidentiality will result in immediate termination of your account."
// 	},
// 	{
// 		title: "Collaboration with Healthcare Providers",
// 		content:
// 			"MyMedHub facilitates communication and collaboration between patients and healthcare providers. By using our platform, you agree to engage in respectful and professional interactions with healthcare professionals."
// 	},
// 	{
// 		title: "Feedback and Improvement",
// 		content:
// 			"We value your feedback and suggestions for improving our platform. Your insights are crucial in helping us enhance the user experience for both healthcare providers and patients."
// 	}
// ];
