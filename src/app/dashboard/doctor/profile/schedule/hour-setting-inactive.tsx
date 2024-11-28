import { Card, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const HourSettingInactive = ({ day }) => {
	return (
		<Card className="bg-hubGrey p-4">
			<CardTitle className="flex justify-between text-hubBlack font-semibold">
				{day}
				<Plus className="size-5" />
			</CardTitle>
		</Card>
	);
};

export default HourSettingInactive;
