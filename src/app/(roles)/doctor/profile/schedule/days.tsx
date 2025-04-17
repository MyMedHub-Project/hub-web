"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
							? "bg-hub-green text-hub-grey hover:bg-hub-green/90"
							: "bg-hub-grey text-hub-black hover:bg-hub-grey200"
					)}
					onClick={handleClick}
				>
					Sat
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.mon
							? "bg-hub-green text-hub-grey hover:bg-hub-green/90"
							: "bg-hub-grey text-hub-black hover:bg-hub-grey200"
					)}
					onClick={handleClick}
				>
					Mon
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.tue
							? "bg-hub-green text-hub-grey hover:bg-hub-green/90"
							: "bg-hub-grey text-hub-black hover:bg-hub-grey200"
					)}
					onClick={handleClick}
				>
					Tue
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.wed
							? "bg-hub-green text-hub-grey hover:bg-hub-green/90"
							: "bg-hub-grey text-hub-black hover:bg-hub-grey200"
					)}
					onClick={handleClick}
				>
					Wed
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.thur
							? "bg-hub-green text-hub-grey hover:bg-hub-green/90"
							: "bg-hub-grey text-hub-black hover:bg-hub-grey200"
					)}
					onClick={handleClick}
				>
					Thur
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.fri
							? "bg-hub-green text-hub-grey hover:bg-hub-green/90"
							: "bg-hub-grey text-hub-black hover:bg-hub-grey200"
					)}
					onClick={handleClick}
				>
					Fri
				</Button>
				<Button
					className={cn(
						"rounded-full size-11",
						availableDays.sun
							? "bg-hub-green text-hub-grey hover:bg-hub-green/90"
							: "bg-hub-grey text-hub-black hover:bg-hub-grey200"
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
