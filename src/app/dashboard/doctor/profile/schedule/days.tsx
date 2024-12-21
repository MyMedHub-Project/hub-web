"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import ScheduleContext from "../context/Schedule";

const Days = () => {
	const { availableDays, setAvailableDays } = useContext(ScheduleContext);

	const handleClick = (e: React.MouseEvent) => {
		const { innerText } = e.target as HTMLElement;
		const day: keyof typeof availableDays = innerText.toLowerCase() as
			| "sun"
			| "mon"
			| "tue"
			| "wed"
			| "thur"
			| "fri"
			| "sat";

		setAvailableDays({ ...availableDays, [day]: !availableDays[day] });
		console.log(availableDays[day]);
	};

	return (
		<div>
			<p className="mb-5">Set your available days</p>
			<div className="flex justify-evenly">
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.sat
							? "bg-hubGreen text-hubGrey hover:bg-hubGreen/90"
							: "bg-hubGrey text-hubBlack hover:bg-hubGrey200"
					)}
					onClick={handleClick}
				>
					Sat
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.mon
							? "bg-hubGreen text-hubGrey hover:bg-hubGreen/90"
							: "bg-hubGrey text-hubBlack hover:bg-hubGrey200"
					)}
					onClick={handleClick}
				>
					Mon
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.tue
							? "bg-hubGreen text-hubGrey hover:bg-hubGreen/90"
							: "bg-hubGrey text-hubBlack hover:bg-hubGrey200"
					)}
					onClick={handleClick}
				>
					Tue
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.wed
							? "bg-hubGreen text-hubGrey hover:bg-hubGreen/90"
							: "bg-hubGrey text-hubBlack hover:bg-hubGrey200"
					)}
					onClick={handleClick}
				>
					Wed
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.thur
							? "bg-hubGreen text-hubGrey hover:bg-hubGreen/90"
							: "bg-hubGrey text-hubBlack hover:bg-hubGrey200"
					)}
					onClick={handleClick}
				>
					Thur
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.fri
							? "bg-hubGreen text-hubGrey hover:bg-hubGreen/90"
							: "bg-hubGrey text-hubBlack hover:bg-hubGrey200"
					)}
					onClick={handleClick}
				>
					Fri
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.sun
							? "bg-hubGreen text-hubGrey hover:bg-hubGreen/90"
							: "bg-hubGrey text-hubBlack hover:bg-hubGrey200"
					)}
					onClick={handleClick}
				>
					Sun
				</Button>
			</div>
		</div>
	);
};

export default Days;
