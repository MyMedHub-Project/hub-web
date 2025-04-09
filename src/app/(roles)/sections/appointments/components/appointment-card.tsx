import React from "react";
import Image from "next/image";
import { RotateCw, User, Video, X } from "lucide-react";
import { AppointmentData } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AppointmentCard = ({ data }: { data: AppointmentData }) => (
	<Card className="w-full shadow-lg rounded-lg overflow-hidden">
		<CardContent className="p-4  space-y-2">
			<div className="flex items-center space-x-4">
				<div className="flex-shrink-0 size-8 rounded-full">
					{data.profileImage !== "" ? (
						<Image
							src={data.profileImage}
							alt="Profile"
							className="size-full"
						/>
					) : (
						<User className="size-full" />
					)}
				</div>
				<div className="flex-1 flex items-center justify-between mb-1">
					<h2 className="text-sm font-semibold">{data.name}</h2>
					<Button
						variant="ghost"
						className="size-9 bg-hubGrey rounded-full flex items-center justify-center justify-self-end"
					>
						<div className="bg-hubBlue p-0.5 rounded-full flex items-center justify-center">
							<Video className="size-5 fill-white text-transparent" />
						</div>
					</Button>
				</div>
			</div>
			<h3>{data.appointment.type}</h3>
			<div className="flex items-center space-x-2 text-xs text-gray-500">
				<span>{data.appointment.date}</span>
				<span>-</span>
				<span>{data.appointment.time}</span>
			</div>
			<div className="flex justify-between gap-x-2 mt-3">
				<Button
					variant="outline"
					className="flex-1 flex-grow bg-hubGreenLight text-hubGreen hover:bg-hubGreen/30"
				>
					<RotateCw className="size-5" />
					Reschedule
				</Button>
				<Button
					variant="outline"
					className="w-10 px-2 flex-grow bg-hubGrey hover:bg-hubGrey200"
				>
					<X className="size-5" />
					Cancel
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default AppointmentCard;
