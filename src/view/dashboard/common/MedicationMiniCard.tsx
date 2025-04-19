import { ChevronRight } from "lucide-react";
import { Button } from "@/components/button";
import { Card } from "@/components/ui/card";
import { Medication } from "@/types/types";
import { AlarmClockIconSVGComponent } from "@/components/icons";

interface MedicationMiniCardProps {
	medication: Medication;
}

export const MedicationMiniCard = ({ medication }: MedicationMiniCardProps) => (
	<Card className="w-full h-medication-mini-card-h rounded-lg p-4 text-xs font-medium flex flex-col justify-between bg-white max-sm:bg-hub-grey max-sm:w-medication-mini-card-w">
		<div className="flex flex-col gap-3">
			<p className="px-2 py-1 bg-hub-purple/10 text-hub-purple rounded-lg w-fit">
				{medication.condition}
			</p>

			<p className="text-sm font-semibold">{medication.description}</p>
		</div>

		<div className="flex justify-between items-center">
			<p className="flex items-center gap-1">
				<span className="bg-hub-orange/10 rounded-full p-1 flex items-center justify-center">
					{" "}
					<AlarmClockIconSVGComponent />
				</span>
				{medication.reminder}
			</p>

			<Button className="flex items-center gap-1 text-hub-blue m-0 p-0 h-fit w-fit bg-transparent">
				View Plan
				<ChevronRight size={20} />
			</Button>
		</div>
	</Card>
);
