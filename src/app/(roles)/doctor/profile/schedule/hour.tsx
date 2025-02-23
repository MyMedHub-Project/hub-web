"use client";

import { ChevronUp, Plus } from "lucide-react";
import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import HourSetting from "./hour-setting";

const Hour: React.FC<{ day: string }> = ({ day }) => {
	const [active, setActive] = useState(false);

	return (
		<Card className="bg-hubGrey p-4">
			<CardTitle className="flex justify-between text-hubBlack font-semibold">
				{day}

				{!active ? (
					<Plus
						className="size-5 cursor-pointer"
						onClick={() => setActive(true)}
					/>
				) : (
					<ChevronUp
						className="size-5 cursor-pointer"
						onClick={() => setActive(false)}
					/>
				)}
			</CardTitle>
			{active ? <HourSetting /> : null}
		</Card>
	);
};

export default Hour;
