import React from "react";
import HeroCards from "@/components/ui/hero-cards";
import UpcomingAppointments from "@/components/widgets/appointments";
import NotificationCard from "@/components/widgets/notification-card";
import PatientsAndTreatments from "@/components/widgets/patient-treatments";

const DoctorPage = () => (
	<div className="p-4 flex gap-4 flex-col md:flex-row">
		<div className="w-full lg:w-2/3 px-5 space-y-7">
			{/* ACTION CARDS */}
			<HeroCards />
			<NotificationCard />
			<PatientsAndTreatments />
		</div>
		<div className="w-full lg:w-1/3 px-5">
			<UpcomingAppointments />
		</div>
	</div>
);

export default DoctorPage;
