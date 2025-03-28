"use client";

import { useState } from "react";
import { AppointmentData } from "@/types/types";
import AppointmentCard from "./appointment-card";

const appointmentsData = {
	id: "1",
	name: "Samuel Anderson",
	profileImage: "",
	appointment: {
		date: " Wednesday, July 12",
		time: "3:00 PM",
		type: "Follow-up on test results"
	}
	// status: "confirmed" | "pending" | "cancelled",
};

const Appointments = () => {
	const [appointments] = useState<AppointmentData[]>(
		Array(7).fill(appointmentsData)
	);

	return (
		<div className="p-4 rounded-lg space-y-3 bg-hubGrey divide-y">
			<h1 className="text-lg">Upcoming Appointments</h1>
			<div className="mt-4 space-y-3 max-h-[calc(100%-40px)] overflow-y-hidden custom-scrollbar">
				{appointments.map((appointment, i) => (
					<AppointmentCard key={i} data={appointment} />
				))}
			</div>
		</div>
	);
};

export default Appointments;
