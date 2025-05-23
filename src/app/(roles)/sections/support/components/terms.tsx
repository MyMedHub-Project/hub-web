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

const TermsAndConditions = () => {
	const [role] = useState<"patient" | "institution">("patient");
	const [termsData, setTermsData] = useState<TermsType[]>([]);

	useEffect(() => {
		switch (role) {
			case "patient":
				setTermsData(PatientTermsContent);
				break;
			// case "doctor":
			// 	setTermsData(DoctorTermsData);
			// 	break;
			case "institution":
				setTermsData(InstitutionTermsContent);
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
				{termsData.map((term, index) => (
					<p key={index} className="text-sm">
						<span className="font-semibold">{term.title}: </span>{" "}
						{term.content}
					</p>
				))}
			</CardContent>
		</Card>
	);
};

export default TermsAndConditions;
