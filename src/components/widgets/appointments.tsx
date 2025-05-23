"use client";

import React, { memo } from "react";
import { AvatarIcon } from "@radix-ui/react-icons";
import { MessageCircle, RefreshCcw, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface Appointment {
	id: number;
	patientName: string;
	patientImage: string;
	description: string;
	onReschedule?: () => void;
	onCancel?: () => void;
}

const appointments: Appointment[] = [
	{
		id: 1,
		patientName: "John Doe",
		patientImage: "",
		description: "Follow-up on test results"
	},
	{
		id: 2,
		patientName: "John Doe",
		patientImage: "",
		description: "Follow-up on test results"
	},
	{
		id: 3,
		patientName: "John Doe",
		patientImage: "",
		description: "Follow-up on test results"
	}
];

const AppointmentCard = memo(
	({ appointment }: { appointment: Appointment }) => (
		<Card key={appointment.id}>
			<CardContent className="p-4 flex flex-col space-y-4">
				<div className="flex items-start justify-between">
					<div className="flex items-center space-x-4">
						<AvatarIcon className="h-10 w-10" />
						<span className="font-bold ">
							{appointment.patientName}
						</span>
					</div>
					<div className="flex items-center space-x-2">
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-hub-blue"
						>
							<MessageCircle className="h-5 w-5" />
							<span className="sr-only">Send message</span>
						</Button>
					</div>
				</div>
				<div className="space-y-4">
					<p className="text-base font-semibold">
						{appointment.description}
					</p>
					<p className="mt-1 text-sm text-muted-foreground">
						Wednesday, July 12 - 3:00 PM
					</p>
				</div>
				<div className="mt-4 flex gap-2">
					<Button
						variant="secondary"
						className="flex-1 bg-hub-green-light text-hub-green hover:bg-hub-green hover:text-hub-green-light"
						onClick={appointment.onReschedule}
					>
						<RefreshCcw className="mr-2 h-4 w-4" />
						Reschedule
					</Button>
					<Button
						variant="secondary"
						className="flex-1"
						onClick={appointment.onCancel}
					>
						<X className="mr-2 h-4 w-4" />
						Cancel
					</Button>
				</div>
			</CardContent>
		</Card>
	)
);
AppointmentCard.displayName = "AppointmentCard";

const UpcomingAppointments = memo(() => (
	<div className="rounded-lg bg-hub-grey p-6 text-hub-black">
		<h2 className="text-lg font-semibold mb-2">Upcoming Appointments</h2>
		<Separator />
		<div className="space-y-4 mt-4">
			{appointments.map((appointment) => (
				<AppointmentCard
					key={appointment.id}
					appointment={appointment}
				/>
			))}
		</div>
	</div>
));
UpcomingAppointments.displayName = "UpcomingAppointments";

export default UpcomingAppointments;
