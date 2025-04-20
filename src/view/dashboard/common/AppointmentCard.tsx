"use client";

import { Button } from "@/components/button";
import {
	ArrowRightIconSVGComponent,
	CalendarIconSVGComponent,
	VideoCallIconSVGComponent
} from "@/components/icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
	data: {
		doctorName: string;
		doctorSpecialization: string;
		appointmentDate: string;
		appointmentTime: string;
		profileImage: string;
	};
	className?: string;
}

export const AppointmentCard = ({ className, data }: AppointmentCardProps) => (
	<Card
		className={cn(
			"h-appointment-card-h w-full flex flex-col p-6 gap-4 text-sm justify-center hover:shadow-md rounded-lg bg-white text-hub-black max-sm:w-appointment-card-w",
			className
		)}
	>
		<h2 className="flex justify-between items-center font-medium text-xs">
			Virtual Consultation with
		</h2>

		<div className="flex justify-between items-center">
			<div className="flex gap-3">
				<Avatar className="bg-hub-green-light border-2 border-hub-grey/10">
					<AvatarImage src={data?.profileImage} />
					{/* <AvatarFallback>
						<UserRound />
					</AvatarFallback> */}
				</Avatar>

				<div className="flex flex-col gap-1">
					<h2 className="text-sm font-semibold">
						{data?.doctorName}
					</h2>
					<p className="text-xs font-normal">
						{data?.doctorSpecialization}
					</p>
				</div>
			</div>

			<VideoCallIconSVGComponent />
		</div>

		<Button
			className="w-full h-12 flex justify-between items-center self-end text-xs bg-hub-green-light text-hub-green font-medium rounded-lg"
			// disabled={loadingState === "disabled"}
			// onClick={onClick}
		>
			<div className="flex gap-2">
				<CalendarIconSVGComponent />

				<p className="text-xs font-normal">
					<span>{data?.appointmentDate} - </span>
					<span>{data?.appointmentTime}</span>
				</p>
			</div>

			<ArrowRightIconSVGComponent />
		</Button>
	</Card>
);
