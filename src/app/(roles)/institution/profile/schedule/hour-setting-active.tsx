import { ChevronUp, Plus } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Interval from "./interval";

const HourSettingActive = () => (
	<Card className="bg-hub-grey p-4">
		<CardTitle className="flex justify-between text-hub-black font-semibold">
			Monday
			<ChevronUp className="size-5" />
		</CardTitle>
		<div className="space-y-4 divide-y-2">
			<Interval />
			<Interval />
		</div>
		<Button className=" w-full h-11 mt-3 text-lg bg-hub-purple/20 text-hub-purple hover:bg-hub-purple/25">
			<Plus />
			Add Interval
		</Button>
	</Card>
);

export default HourSettingActive;
