"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type TimeSlot = {
	id: string;
	start: string;
	end: string;
};

const times: TimeSlot[] = [
	{ id: "1", start: "12:30", end: "1:00" },
	{ id: "2", start: "1:00", end: "1:30" },
	{ id: "3", start: "1:30", end: "2:00" },
	{ id: "4", start: "2:00", end: "2:30" }
];

const AppointmentTimePicker = () => {
	const [selectedSlot, setSelectedSlot] = useState<string>("1");

	return (
		<div className="grid grid-cols-2 gap-2">
			{times.map((time) => (
				<button
					key={time.id}
					type="button"
					onClick={() => setSelectedSlot(time.id)}
					className={cn(
						"rounded-full p-2 text-sm transition-colors",
						selectedSlot === time.id
							? "bg-hubGreen text-hubGrey200"
							: " bg-hubGrey hover:bg-hubGrey/80 text-hubBlack/50"
					)}
				>
					<span>{`${time.start} - ${time.end}`}</span>
				</button>
			))}
		</div>
	);
};

export default AppointmentTimePicker;
