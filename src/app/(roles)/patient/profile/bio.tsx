import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Bio = () => (
	<Card className="bg-hub-grey divide-y-2">
		<CardHeader className="pb-2 flex flex-row gap-x-1">
			<AlertCircle className="fill-hub-purple text-hub-grey" /> Bio
		</CardHeader>
		<CardContent className="pt-2">
			Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
			vulputate libero et velit interdum, ac aliquet odio mattis.
		</CardContent>
	</Card>
);

export default Bio;
