import React from "react";
import HeroCards from "@/components/ui/hero-cards";
import NotificationCard from "@/components/widgets/notification-card";
import PatientsAndTreatments from "@/components/widgets/patient-treatments";
import Appointments from "@/components/widgets/appointments";

const PatientPage = () => (
	<div className="px-4 flex gap-4 flex-col md:flex-row">
		<div className="w-full md:w-1/2 lg:w-2/3 space-y-7">
			{/* ACTION CARDS */}
			<HeroCards />
			<NotificationCard />
			<PatientsAndTreatments />
		</div>
		<div className="w-full md:w-1/2 lg:w-1/3">
			<Appointments />
		</div>
	</div>
);
export default PatientPage;
