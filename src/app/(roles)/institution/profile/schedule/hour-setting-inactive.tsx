import { Plus } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";

interface HourSettingInactiveProps {
	day: string;
}

const HourSettingInactive = ({ day }: HourSettingInactiveProps) => (
	<Card className="bg-hub-grey p-4">
		<CardTitle className="flex justify-between text-hub-black font-semibold">
			{day}
			<Plus className="size-5" />
		</CardTitle>
	</Card>
);

export default HourSettingInactive;
