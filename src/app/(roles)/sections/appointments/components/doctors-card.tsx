"use client";

import Link from "next/link";
import { CalendarDays, MapPin, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AppointDoctor } from "@/types/types";

const DoctorCard = ({ data }: { data: AppointDoctor }) => (
	<Card className="w-full max-w-[280px] rounded bg-hubGrey overflow-hidden">
		<CardContent className="p-2 flex flex-col items-center text-center">
			<Avatar className="size-16 border-4 border-hubGrey200 shadow-xs mb-3">
				<AvatarImage src={data.avatar} alt="Dr. Dolor" />
				<AvatarFallback>DR</AvatarFallback>
			</Avatar>

			<h3 className="font-semibold text-lg text-gray-800">{data.name}</h3>
			<p className="text-sm text-gray-500 mb-1">{data.role}</p>

			<div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
				<MapPin className="size-3.5 text-gray-400" />
				<span>{data.location}</span>
			</div>

			<div className="flex items-center gap-1 mb-1">
				<div className="flex">
					<Star className="size-4 fill-yellow-400 text-yellow-400" />
					<span className="text-sm font-medium text-gray-700">
						{data.rating}
					</span>
				</div>
				<Link href="#" className="text-sm text-blue-600 underline">
					{data.reviews}
				</Link>
			</div>
		</CardContent>

		<CardFooter className="p-2 pt-0">
			<Button className="w-full bg-hubGreenLight hover:bg-hubGreen/30 text-hubGreen text-xs">
				<CalendarDays className="size-5" />
				Book Appointment
			</Button>
		</CardFooter>
	</Card>
);

export default DoctorCard;
