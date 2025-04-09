import { CalendarDays, Heart, MessageCircleMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import Review from "./review";
import About from "./about";
import Bio from "./bio";
import Services from "./services";

const DoctorProfileSection = () => (
	<div className="flex-1 space-y-5">
		<About />
		<div className="flex gap-x-2">
			<Button className="w-full bg-hubGreenLight hover:bg-hubGreen/30 text-hubGreen text-xs">
				<CalendarDays className="size-5" />
				Book Appointment
			</Button>
			<Button variant="outline" className="bg-hubGrey">
				<MessageCircleMore className="fill-hubBlack text-hubGrey" />
			</Button>
			<Button variant="outline" className="bg-hubGrey">
				<Heart className="fill-hubRed text-hubRed" />
			</Button>
		</div>
		<Bio />
		<Services />
		<Review />
	</div>
);

export default DoctorProfileSection;
