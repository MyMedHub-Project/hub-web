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
			<Button className="w-full bg-hub-green-light hover:bg-hub-green/30 text-hub-green text-xs">
				<CalendarDays className="size-5" />
				Book Appointment
			</Button>
			<Button variant="outline" className="bg-hub-grey">
				<MessageCircleMore className="fill-hub-black text-hub-grey" />
			</Button>
			<Button variant="outline" className="bg-hub-grey">
				<Heart className="fill-hub-red text-hub-red" />
			</Button>
		</div>
		<Bio />
		<Services />
		<Review />
	</div>
);

export default DoctorProfileSection;
