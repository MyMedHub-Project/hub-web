import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const Bio = () => {
	return (
		<Card className="bg-hubGrey divide-y-2">
			<CardHeader className="pb-2 flex flex-row gap-x-1">
				<AlertCircle className="fill-hubPurple text-hubGrey" /> Bio
			</CardHeader>
			<CardContent className="pt-2">
				Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
				vulputate libero et velit interdum, ac aliquet odio mattis.
			</CardContent>
		</Card>
	);
};

export default Bio;
