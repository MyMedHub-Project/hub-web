"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HourSetting from "./hour-setting";
import { useContext, useState } from "react";
import ScheduleContext from "../context/Schedule";
import { cn } from "@/lib/utils";
import Hour from "./hour";

const Time = () => {
	const { availableDays } = useContext(ScheduleContext);
	const [useSameTime, setUseSameTime] = useState(true);

	return (
		<div className="space-y-3">
			<Card className="px-5 py-3 bg-hubGrey rounded-lg flex items-center justify-between">
				<CardContent className="p-0">
					Use same hours for all days
				</CardContent>
				<Button
					className={cn(
						"relative  p-2.5 w-[60px] block rounded-full",
						useSameTime
							? "bg-hubGreen/10 hover:bg-hubGreen/15"
							: "bg-hubGrey200 hover:bg-hubGrey200/95"
					)}
					onClick={() => setUseSameTime(!useSameTime)}
				>
					<span
						className={cn(
							"absolute top-1/2 -translate-y-1/2 rounded-full size-6",
							useSameTime
								? "right-2 bg-hubGreen"
								: "left-2 bg-gray-700"
						)}
					></span>
				</Button>
			</Card>
			{useSameTime ? (
				<Card className="bg-hubGrey p-4">
					<HourSetting />
				</Card>
			) : (
				<>
					{availableDays.mon && <Hour day="Monday" />}
					{availableDays.tue && <Hour day="Tuesday" />}
					{availableDays.wed && <Hour day="Wednesday" />}
					{availableDays.thur && <Hour day="Thursday" />}
					{availableDays.fri && <Hour day="Friday" />}
					{availableDays.sat && <Hour day="Saturday" />}
					{availableDays.sun && <Hour day="Sunday" />}
				</>
			)}
		</div>
	);
};

export default Time;
