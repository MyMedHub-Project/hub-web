"use client";

import { ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AppointmentTimePicker from "./time-picker";
import AppointmentSummaryDialog from "./action-modals/appointment-summary";

const BookingSection = () => (
	<Card className="border-0 shadow-0 p-3">
		<CardHeader className="p-0 border-b">
			<CardTitle className="text-lg">Book Appointment</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4 p-0">
			{/* Doctor Info */}
			<div className="flex flex-col items-center gap-y-1 mt-4 p-3 bg-hub-grey rounded-lg">
				<Avatar className="size-20 border">
					<AvatarImage
						src="/placeholder.svg?height=48&width=48"
						alt="Dr. Doller"
					/>
					<AvatarFallback>DR</AvatarFallback>
				</Avatar>
				<p className="font-medium">Dr. Doller</p>
				<p className="text-sm text-muted-foreground">Cardiologist</p>
			</div>

			<div className="space-y-2">
				<Label htmlFor="reason">Reason for Visit</Label>
				<Input
					id="reason"
					placeholder="Follow-up on test results"
					className="p-3 bg-hub-grey text-hub-black border-0 border-b-2 border-b-hub-grey200 focus:border-0 focus:border-b-2 focus:border-b-hub-green outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
				/>
			</div>

			{/* Date Selection */}
			<div className="space-y-2">
				<div className="flex justify-between items-center">
					<Label>Date</Label>
					<div className="flex items-center text-sm text-muted-foreground">
						June <ChevronRight className="h-4 w-4" />
					</div>
				</div>
				<Calendar
					mode="single"
					selected={new Date()}
					onSelect={() => {}}
					className="w-full"
				/>
			</div>

			<div className="space-y-2">
				<Label>Pick a Time</Label>
				<AppointmentTimePicker />
			</div>

			<div className="space-y-2">
				<Label>Appointment Type</Label>
				<RadioGroup defaultValue="virtual" className="space-y-2">
					<div className="bg-hub-green-light flex items-center space-x-2 rounded-md border p-3">
						<RadioGroupItem
							value="virtual"
							id="virtual"
							className="bg-transparent border-hub-green focus:bg-hub-green"
						/>
						<Label
							htmlFor="virtual"
							className="flex-1 cursor-pointer"
						>
							Virtual Consultation
						</Label>
					</div>
					<div className="bg-hub-green-light flex items-center space-x-2 rounded-md border p-3">
						<RadioGroupItem
							value="in-person"
							id="in-person"
							className="bg-transparent border-hub-green focus:bg-hub-green"
						/>
						<Label
							htmlFor="in-person"
							className="flex-1 cursor-pointer"
						>
							In-person Consultation
						</Label>
					</div>
				</RadioGroup>
			</div>

			<div className="space-y-2">
				<Label htmlFor="note">Additional note</Label>
				<Textarea
					id="note"
					className="h-24 resize-none p-3 bg-hub-grey text-hub-black border-0 border-b-2 border-b-hub-grey200 focus:border-0 focus:border-b-2 focus:border-b-hub-green outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
					placeholder="Add note"
				/>
			</div>
		</CardContent>

		<CardFooter className="p-0 mt-4">
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						className="w-full bg-hub-green text-hub-grey200 hover:bg-hub-green/70"
					>
						Book Appointment
					</Button>
				</DialogTrigger>

				<AppointmentSummaryDialog />
			</Dialog>
		</CardFooter>
	</Card>
);

export default BookingSection;
