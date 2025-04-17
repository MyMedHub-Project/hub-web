import { Cross } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Health = () => (
	<Card className="bg-hub-grey divide-y-2">
		<CardHeader className="pb-2 flex flex-row gap-x-1">
			<Cross className="fill-hub-purple text-hub-grey" /> Health
			Conditions
		</CardHeader>
		<CardContent className="pt-2 flex gap-x-2">
			<div className="bg-hub-grey200 py-2 px-4 w-fit rounded-3xl">
				Diabetes
			</div>
			<div className="bg-hub-grey200 py-2 px-4 w-fit rounded-3xl">
				Hypertension
			</div>
		</CardContent>
	</Card>
);

export default Health;
