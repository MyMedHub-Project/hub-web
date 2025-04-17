import React from "react";
import { ArrowRight } from "lucide-react";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const patients = [
	{
		id: 1,
		name: "John Doe",
		image: "",
		isOnline: true
	},
	{
		id: 2,
		name: "John Doe",
		image: "",
		isOnline: true
	},
	{
		id: 3,
		name: "John Doe",
		image: "",
		isOnline: true
	},
	{
		id: 4,
		name: "John Doe",
		image: "",
		isOnline: false
	}
];

const treatments = [
	{
		id: 1,
		patientName: "John Doe",
		image: "",
		type: "Tuberculosis"
	},
	{
		id: 2,
		patientName: "John Doe",
		image: "",
		type: "Tuberculosis"
	},
	{
		id: 3,
		patientName: "John Doe",
		image: "",
		type: "Tuberculosis"
	}
];

export default function PatientsAndTreatments() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
			<Card className="bg-hub-grey">
				<CardHeader className=" flex flex-row items-center justify-between space-y-0 pb-4">
					<CardTitle className="text-base font-medium">
						Patients
					</CardTitle>
					<ArrowRight className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent className="space-y-4 p-4">
					{patients.map((patient) => (
						<div
							key={patient.id}
							className="flex items-center space-x-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors bg-white"
						>
							<div className="relative">
								<AvatarIcon className="h-8 w-8"></AvatarIcon>
								{patient.isOnline ? (
									<span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-hub-green ring-2 ring-white" />
								) : (
									<span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-gray-500 ring-2 ring-white" />
								)}
							</div>
							<span className="flex-1 text-sm font-medium">
								{patient.name}
							</span>
						</div>
					))}
				</CardContent>
			</Card>
			<Card className="bg-hub-grey">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
					<CardTitle className="text-base font-medium">
						Treatment Plans
					</CardTitle>
					<ArrowRight className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent className="space-y-4">
					{treatments.map((treatment) => (
						<div
							key={treatment.id}
							className="flex items-center rounded-lg border p-3 hover:bg-muted/50 bg-white"
						>
							<div className="flex-col flex flex-1 p-2">
								<div className="flex justify-between">
									<span className="">
										<p className="font-bold">
											{treatment.type}
										</p>
									</span>
									<ArrowRight />
								</div>
								<div className="flex items-center space-x-4">
									<AvatarIcon className="w-8 h-8" />
									<div className="space-y-1">
										<p className="text-muted-foreground">
											{treatment.patientName}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
