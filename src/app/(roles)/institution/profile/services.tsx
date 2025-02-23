import { Cross } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Services = () => (
	<Card className="bg-hubGrey divide-y-2">
		<CardHeader className="pb-2 flex flex-row gap-x-1">
			<Cross className="fill-hubPurple text-hubGrey" /> Services
		</CardHeader>
		<CardContent className="pt-2 flex gap-x-2">
			<div className="bg-hubGrey200 py-2 px-4 w-fit rounded-3xl">
				Emergency Services
			</div>
			<div className="bg-hubGrey200 py-2 px-4 w-fit rounded-3xl">
				Surgery
			</div>
			<div className="bg-hubGrey200 py-2 px-4 w-fit rounded-3xl">
				General Dentistry
			</div>
			<div className="bg-hubGrey200 py-2 px-4 w-fit rounded-3xl">
				Maternity
			</div>
		</CardContent>
	</Card>
);

export default Services;
