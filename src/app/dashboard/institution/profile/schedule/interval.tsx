import { Label } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, X } from "lucide-react";

const Interval = () => {
	return (
		<div className="space-y-2 pt-3">
			<div className="grid grid-cols-2 gap-x-2">
				<div className="">
					<p className="text-sm ml-2 mb-2">Start time</p>
					<Card className="h-12 px-6 flex items-center justify-between">
						1:00 PM <ChevronDown />
					</Card>
				</div>
				<div className="">
					<p className="text-sm ml-2 mb-2">Start time</p>
					<Card className="h-12 px-6 flex items-center justify-between">
						1:00 PM <ChevronDown />
					</Card>
				</div>
			</div>
			<div className="flex justify-between gap-x-2">
				<Card className="p-4 flex-1 flex items-center">
					<Input
						type="checkbox"
						className="size-6 border-2 border-hubGreen"
					/>
					<Label className="ml-2">Mark as Unavailable</Label>
				</Card>
				<Card className="p-4">
					<X />
				</Card>
			</div>
		</div>
	);
};

export default Interval;
