"use client";

import { Filter, Search } from "lucide-react";
import React from "react";
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

// interface AppointDoctor {
// 	id: string;
// 	name: string;
// 	role: string;
// 	location: string;
// 	rating: number;
// 	reviews: string;
// }

const DoctorsCard = () => (
	// const [rating, setRating] = useState(5);
	// const [gender, setGender] = useState("Male");
	<>
		<Card>
			<CardHeader>
				<CardTitle>Find Doctors Near You</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2 w-full items-center">
					<div className="relative w-full">
						<Search className="absolute top-2.5 left-2 h-4 w-4 items-center" />
						<Input
							placeholder="Search by name, specialty..."
							className="bg-hubGrey px-8 text-sm text-muted-foreground"
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
									<Label htmlFor="location">Location</Label>
									<Select>
										<SelectTrigger
											defaultValue=""
											className="cursor-pointer bg-hubGrey p-4"
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
									<Label htmlFor="location">Specialty</Label>
									<Select>
										<SelectTrigger
											defaultValue=""
											className="cursor-pointer bg-hubGrey p-4"
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
								</div>

								<div className="space-y-2">
									<Label htmlFor="gender">Gender</Label>
								</div>
							</div>
							<SheetFooter>
								<div className="w-full flex gap-2 items-center justify-center">
									<Button
										size="lg"
										variant="default"
										className="bg-hubGreen text-white hover:bg-hubGreen/80 w-full"
									>
										Filter
									</Button>
									<Button
										size="lg"
										variant="destructive"
										className="bg-hubGreenLight text-hubGreen hover:text-white w-full"
									>
										Reset
									</Button>
								</div>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</CardContent>
		</Card>
	</>
);
export default DoctorsCard;
