"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Interval from "./interval";

const HourSetting = () => {
	const [hasInterval, setHasInterval] = useState(false);

	return (
		<>
			<div className="space-y-4 divide-y-2">
				<Interval
					hasInterval={hasInterval}
					setHasInterval={setHasInterval}
				/>
				{hasInterval ? (
					<Interval
						hasInterval={hasInterval}
						setHasInterval={setHasInterval}
					/>
				) : null}
			</div>
			<Button
				className="w-full h-11 mt-3 text-lg bg-hub-green/20 text-hub-green hover:bg-hub-green/25 transition-colors disabled:bg-hub-purple/30 disabled:text-hub-purple"
				disabled={hasInterval}
				onClick={() => setHasInterval(true)}
			>
				<Plus />
				Add Interval
			</Button>
		</>
	);
};

export default HourSetting;
