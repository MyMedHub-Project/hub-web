import React from "react";
import DoctorsSection from "./components/doctors-section";
import Appointments from "./components/appointments";

const Appoinments = () => (
	<div className="w-full flex flex-col lg:flex-row gap-4 text-hubBlack">
		<div className="flex flex-1 flex-col lg:w-2/3">
			<DoctorsSection />
		</div>
		<div className="flex flex-col lg:w-1/3">
			<Appointments />
		</div>
	</div>
);

export default Appoinments;
