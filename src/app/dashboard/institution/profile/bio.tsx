import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const Bio = () => {
	return (
		<Card className="bg-hubGrey divide-y-2">
			<CardHeader className="pb-2 flex flex-row gap-x-1">
				<AlertCircle className="fill-hubPurple text-hubGrey" /> Bio
			</CardHeader>
			<CardContent className="pt-2">
				Federal Medical Centre is a state-of-the-art medical facility
				providing comprehensive healthcare services to the community.
				Our dedicated team of professionals ensures the highest
				standards of medical care.
			</CardContent>
		</Card>
	);
};

export default Bio;
