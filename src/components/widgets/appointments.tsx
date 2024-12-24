import React from "react";
import { Card, CardContent } from "../ui/card";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { MessageCircle, RefreshCcw, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

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

export default async function UpcomingAppointments() {
	return (
		<div className="rounded-lg bg-hubGrey p-6 text-hubBlack">
			<h2 className="text-lg font-semibold mb-2">
				Upcoming Appointments
			</h2>
			<Separator />
			<div className="space-y-4 mt-4">
				{appointments.map((appointment) => (
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
										className="h-8 w-8 text-hubBlue"
									>
										<MessageCircle className="h-5 w-5" />
										<span className="sr-only">
											Send message
										</span>
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
									className="flex-1 bg-hubGreenLight text-hubGreen hover:bg-hubGreen hover:text-hubGreenLight"
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
				))}
			</div>
		</div>
	);
}
