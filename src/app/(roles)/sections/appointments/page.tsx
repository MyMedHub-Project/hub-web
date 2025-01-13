import React from "react";
import DoctorsCard from "./doctors-card";

const Appoinments = () => {
	return (
		<div className="w-full flex flex-col lg:flex-row gap-4 text-hubBlack">
			<div className="flex flex-1 flex-col lg:w-2/3">
				LHS
				<DoctorsCard />
			</div>
			<div className="flex flex-col lg:w-1/3">RHS</div>
		</div>
	);
};

export default Appoinments;
