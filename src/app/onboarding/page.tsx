import React, { useState } from "react";
import Logo from "../../../public/images/Logo.svg";
import Doctor from "../../../public/images/Doctor.svg";
import Patient from "../../../public/images/Patient.svg";
import Institution from "../../../public/images/Institution.svg";
import Image from "next/image";

function Onboarding() {
	return (
		<div className="min-w-screen min-h-screen flex items-center justify-center text-[#0D1717]">
			<div className="w-[816px] h-[519px] p-6 flex flex-col items-center justify-between">
				<div className="flex flex-col items-center justify-center gap-y-1.5">
					<h3 className="font-semibold">Welcome to</h3>
					<Image src={Logo} alt="web_hub logo" />
					<p className="mt-2">Choose Your Role to Get Started</p>
				</div>

				<div className="grid grid-cols-3 gap-x-4 w-full">
					<div className="h-[150px] bg-[#FAFAFA] rounded-3xl shadow hover:shadow-md flex flex-col items-center justify-center gap-y-3 transition cursor-pointer">
						<Image src={Patient} alt="Patient" />
						<p className="font-medium cursor-pointer">Patient</p>
					</div>
					<div className="h-[150px] bg-[#FAFAFA] rounded-3xl shadow hover:shadow-md flex flex-col items-center justify-center gap-y-3 transition cursor-pointer">
						<Image src={Doctor} alt="Doctor" />
						<p className="font-medium">Doctor</p>
					</div>
					<div className="h-[150px] bg-[#FAFAFA] rounded-3xl flex flex-col items-center justify-center gap-y-3 transition cursor-pointer  border border-[#E4871B] shadow-lg">
						<Image src={Institution} alt="Institution" />
						<p className="font-medium">Health Institution</p>
					</div>
				</div>

				<div className="w-[327px] flex flex-col items-center justfy-center gap-y-4">
					<p className="text-center text-[#808080] font-light">
						Join MyMedHub to access comprehensive healthcare
						services tailored to your needs
					</p>
					<button className="bg-[#068513] hover:bg-opacity-90 transition text-white p-4 rounded-xl w-full">
						Next
					</button>
					<p className="font-medium">
						Already have an account?{" "}
						<a className="text-[#0853C2] hover:underline cursor-pointer">
							Login
						</a>{" "}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Onboarding;
