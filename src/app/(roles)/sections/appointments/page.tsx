import React from "react";
import Appointments from "@/components/widgets/appointments";
import DoctorsSection from "./components/doctors-section";

const Appoinments = () => (
	<div className="px-4 w-full flex flex-col lg:flex-row gap-4 text-hubBlack">
		<div className="flex flex-1 flex-col lg:w-2/3">
			<DoctorsSection />
		</div>
		<div className="flex flex-col lg:w-1/3">
			<Appointments />
		</div>
	</div>
);

export default Appoinments;
