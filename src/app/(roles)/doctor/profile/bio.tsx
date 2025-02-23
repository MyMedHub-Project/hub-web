import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Bio = () => (
	<Card className="bg-hubGrey divide-y-2">
		<CardHeader className="pb-2 flex flex-row gap-x-1">
			<AlertCircle className="fill-hubPurple text-hubGrey" /> Bio
		</CardHeader>
		<CardContent className="pt-2">
			Dr. Dolor Manchi is a dedicated pediatrician with over 15 years of
			experience in providing comprehensive healthcare to children. He is
			passionate about preventive care and patient education, ensuring
			that families are well-informed about their child&apos;s health and
			wellness.
		</CardContent>
	</Card>
);

export default Bio;
