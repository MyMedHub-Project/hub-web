"use client";

import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Interval: React.FC<{
	hasInterval: boolean;
	setHasInterval: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ hasInterval, setHasInterval }) => {
	const [availability, setAvailability] = useState(true);

	return (
		<div className="space-y-4 pt-3">
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
				<Button
					className="p-6 px-4  flex-1 justify-start rounded-xl bg-white text-hubBlack hover:bg-white disabled:bg-hubGrey200 disabled:opacity-100"
					disabled={!hasInterval}
				>
					<Input
						type="checkbox"
						checked={hasInterval ? availability : true}
						onChange={() => setAvailability(!availability)}
						className="size-5 border-2 border-hubGreen"
					/>
					<Label className="ml-2">Mark as Unavailable</Label>
				</Button>
				<Button
					className="p-6 rounded-xl bg-white text-hubBlack hover:bg-white disabled:bg-hubGrey200 disabled:opacity-100"
					disabled={!hasInterval}
					onClick={() => setHasInterval(false)}
				>
					<X className="size-5" />
				</Button>
			</div>
		</div>
	);
};

export default Interval;
