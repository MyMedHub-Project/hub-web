"use client";

import { Filter, Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger
} from "@/components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet";
import { AppointDoctor } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import DoctorCard from "./doctors-card";

const doctorData: AppointDoctor = {
	id: "1",
	name: "Dr.Dolor",
	avatar: "",
	role: "Cardiologist",
	location: "Lagos, Nigeria",
	rating: 4.4,
	reviews: "45 reviews"
};

const DoctorsSection = () => {
	const [
		doctors
		// setDoctors
	] = useState<AppointDoctor[]>(Array(10).fill(doctorData));
	// const [rating, setRating] = useState(5);
	// const [gender, setGender] = useState("Male");

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Find Doctors Near You</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex gap-2 w-full items-center mb-5">
						<div className="relative w-full">
							<Search className="absolute top-2.5 left-2 h-4 w-4 items-center" />
							<Input
								placeholder="Search by name, specialty..."
								className="bg-hub-grey px-8 text-sm text-muted-foreground"
							/>
						</div>
						<Sheet>
							<SheetTrigger>
								<Filter />
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Filter</SheetTitle>
								</SheetHeader>
								<div className="mt-5 space-y-5">
									<div className="space-y-2">
										<Label htmlFor="location">
											Location
										</Label>
										<Select>
											<SelectTrigger
												defaultValue=""
												className="cursor-pointer bg-hub-grey p-4"
											>
												<Label>Select Location</Label>
												<SelectContent className="py-2">
													<SelectItem value="Lagos">
														Lagos
													</SelectItem>
													<SelectItem value="Abuja">
														Abuja
													</SelectItem>
													<SelectItem value="Kano">
														Kano
													</SelectItem>
												</SelectContent>
											</SelectTrigger>
										</Select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="location">
											Specialty
										</Label>
										<Select>
											<SelectTrigger
												defaultValue=""
												className="cursor-pointer bg-hub-grey p-4"
											>
												<Label>Cardiology</Label>
												<SelectContent className="py-2">
													<SelectItem value="Lagos">
														Cardiology
													</SelectItem>
												</SelectContent>
											</SelectTrigger>
										</Select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="rating">Rating</Label>
										<div className="flex items-center space-x-2">
											<Checkbox id="terms2" disabled />
											<label
												htmlFor="terms2"
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												Accept terms and conditions
											</label>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="gender">Gender</Label>
										<div className="flex items-center space-x-2">
											<Checkbox id="terms2" disabled />
											<label
												htmlFor="terms2"
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												Accept terms and conditions
											</label>
										</div>
									</div>
								</div>
								<SheetFooter>
									<div className="w-full flex gap-2 items-center justify-center">
										<Button
											size="lg"
											variant="default"
											className="bg-hub-green text-white hover:bg-hub-green/80 w-full"
										>
											Filter
										</Button>
										<Button
											size="lg"
											variant="destructive"
											className="bg-hub-green-light text-hub-green hover:text-white w-full"
										>
											Reset
										</Button>
									</div>
								</SheetFooter>
							</SheetContent>
						</Sheet>
					</div>

					<div className="grid grid-cols-3 gap-3">
						{doctors.map((doctor, i) => (
							<DoctorCard key={i} data={doctor} />
						))}
					</div>
				</CardContent>
			</Card>
		</>
	);
};
export default DoctorsSection;
