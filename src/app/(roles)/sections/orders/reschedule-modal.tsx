"use client";

import { PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface RescheduleModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onReschedule: (date: Date, time: string) => void;
}

export function RescheduleModal({
	onOpenChange,
	onReschedule,
	open
}: RescheduleModalProps) {
	const [date, setDate] = useState<Date>();
	const [time, setTime] = useState("10:00AM");

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[425px] bg-white text-hub-black">
				<DialogHeader>
					<DialogTitle>Reschedule Lab Order</DialogTitle>
					<span className="text-xs">
						Reschedule to a new date that works for you. A new order
						with the same deails will be creatted for the date you
						pick.
					</span>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label className="text-sm font-medium">Set Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={cn(
										"w-full justify-between text-left font-normal flex",
										!date && "text-muted-foreground"
									)}
								>
									{date ? format(date, "PPP") : ""}
									<CalendarIcon className="left-0 mr-2 h-4 w-4 " />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0 bg-hub-grey fill-transparent">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="grid gap-2">
						<Label className="text-sm font-medium">Set Time</Label>
						<Select value={time} onValueChange={setTime}>
							<SelectTrigger>
								<SelectValue placeholder="Select time" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="9:00AM">9:00AM</SelectItem>
								<SelectItem value="10:00AM">10:00AM</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="flex gap-2">
					<Button
						disabled={!date}
						onClick={() => date && onReschedule(date, time)}
						className="bg-hub-green w-full"
					>
						Reschedule
					</Button>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						className="bg-hub-grey hover:bg-destructive hover:text-white w-full"
					>
						Cancel
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
