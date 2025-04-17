"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ScheduleContext from "../context/Schedule";
import HourSetting from "./hour-setting";
import Hour from "./hour";

const Time = () => {
	const { availableDays } = useContext(ScheduleContext);
	const [useSameTime, setUseSameTime] = useState(true);

	return (
		<div className="space-y-3">
			<Card className="px-5 py-3 bg-hub-grey rounded-lg flex items-center justify-between">
				<CardContent className="p-0">
					Use same hours for all days
				</CardContent>
				<Button
					className={cn(
						"relative  p-2.5 w-[60px] block rounded-full",
						useSameTime
							? "bg-hub-green/10 hover:bg-hub-green/15"
							: "bg-hub-grey200 hover:bg-hub-grey200/95"
					)}
					onClick={() => setUseSameTime(!useSameTime)}
				>
					<span
						className={cn(
							"absolute top-1/2 -translate-y-1/2 rounded-full size-6",
							useSameTime
								? "right-2 bg-hub-green"
								: "left-2 bg-gray-700"
						)}
					></span>
				</Button>
			</Card>
			{useSameTime ? (
				<Card className="bg-hub-grey p-4">
					<HourSetting />
				</Card>
			) : (
				<>
					{availableDays.mon ? <Hour day="Monday" /> : null}
					{availableDays.tue ? <Hour day="Tuesday" /> : null}
					{availableDays.wed ? <Hour day="Wednesday" /> : null}
					{availableDays.thur ? <Hour day="Thursday" /> : null}
					{availableDays.fri ? <Hour day="Friday" /> : null}
					{availableDays.sat ? <Hour day="Saturday" /> : null}
					{availableDays.sun ? <Hour day="Sunday" /> : null}
				</>
			)}
		</div>
	);
};

export default Time;
