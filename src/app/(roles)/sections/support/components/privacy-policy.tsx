import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader
} from "@/components/ui/card";
import {
	InstitutionTermsContent,
	PatientTermsContent,
	TermsType
} from "@/view/auth/common/TermsModal";

const PrivacyPolicy = () => {
	const [role] = useState<"patient" | "institution">("patient");
	const [termsContent, setTermsContent] = useState<TermsType[]>([]);

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

	return (
		<Card className="border-none shadow-none bg-transparent">
			<CardHeader className="p-0 text-lg font-bold">
				Terms & Conditions
			</CardHeader>
			<CardDescription>Last Updated: 12 April, 2024</CardDescription>
			<CardContent className="px-0 mt-5 space-y-2">
				{termsContent.map((term, index) => (
					<p key={index} className="text-sm">
						<span className="font-semibold">{term.title}: </span>{" "}
						{term.content}
					</p>
				))}
			</CardContent>
		</Card>
	);
};

export default PrivacyPolicy;
