import { Droplet, Trash2, User } from "lucide-react";
import { Button } from "@/components/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/components/ui/card";

const meds = [
	{
		name: "Amoxicillin 500mg",
		dose: "1 Tablet",
		frequency: "Once a day",
		duration: "7 Days"
	},
	{
		name: "Acetaminophen 250mg/5ml",
		dose: "10ml",
		frequency: "Every 4-6 hours",
		duration: "5 Days"
	}
];

const ViewSection = () => (
	<Card className="flex-1 px-4">
		<CardHeader className="pb-3 px-0">
			<h3 className="font-bold">Tuberculosis Treatment</h3>
			<div className="w-fit py-1 px-2 flex items-center gap-x-2 bg-hub-grey/20 rounded-full">
				<div className="size-6 flex items-center justify-center rounded-full border-2 border-hub-grey200">
					<User className="size-[80%]" />
				</div>
				<p className="text-hub-blue text-xs">Samuel Anderson</p>
			</div>
		</CardHeader>
		<CardContent className="px-0">
			<p className="mb-1">Prescriptions</p>
			<div className="p-3 space-y-3 bg-hub-grey rounded-xl">
				{meds.map((med, i) => (
					<div
						key={i}
						className="p-3 rounded-md flex justify-between bg-white"
					>
						<div className="space-y-2">
							<h4 className="font-semibold">{med.name}</h4>
							<div className="">
								<p className="text-sm text-hub-black/50">
									Dosage:{" "}
									<span className="text-hub-black">
										{med.dose}
									</span>
								</p>
								<p className="text-sm text-hub-black/50">
									Frequency:{" "}
									<span className="text-hub-black">
										{med.frequency}
									</span>
								</p>
								<p className="text-sm text-hub-black/50">
									Duration:{" "}
									<span className="text-hub-black">
										{med.duration}
									</span>
								</p>
							</div>
						</div>
						<div className="flex flex-col items-center justify-between">
							<div className="size-7 flex items-center justify-center rounded-full bg-hub-red/30 text-hub-red/90">
								<Droplet className="size-[80%]" />
							</div>
							<Button className="p-0 bg-transparent text-hub-black hover:bg-transparent">
								<Trash2 className="size-6" />
							</Button>
						</div>
					</div>
				))}
			</div>
		</CardContent>

		<CardFooter className="px-0 flex flex-col items-start">
			<p className="text-left">Note:</p>
			<div className="bg-hub-grey rounded-lg p-2.5">
				<ol className="list-decimal pl-5">
					<li className="text-sm">
						Take medications with food to reduce stomach upset.
						Avoid
					</li>
					<li className="text-sm">alcohol while on medication. </li>
					<li className="text-sm">
						Report any adverse effects such as nausea, vomiting, or
						jaundice immediately.
					</li>
				</ol>
			</div>
		</CardFooter>
	</Card>
);

export default ViewSection;
