import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const Contact = ({ contactInfo }: { contactInfo: any }) => {
	return (
		<Card className="bg-hubGrey divide-y-2">
			<CardHeader className="pb-2 flex flex-row gap-x-1">
				<AlertCircle className="fill-hubPurple text-hubGrey" />
				Emergency contact
			</CardHeader>
			<CardContent className="pt-2 space-y-1">
				<div className="space-y-1">
					<span className="text-sm text-gray-500">Name</span>
					<p>{contactInfo ? contactInfo.name : "-----"}</p>
				</div>
				<div className="space-y-1">
					<span className="text-sm text-gray-500">Relationship</span>
					<p>{contactInfo ? contactInfo.relationship : "-----"}</p>
				</div>
				<div className="space-y-1">
					<span className="text-sm text-gray-500">Phone</span>
					<p>{contactInfo ? contactInfo.phone : "-----"}</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default Contact;
