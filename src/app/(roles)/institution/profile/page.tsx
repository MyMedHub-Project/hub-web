import { Card, CardContent, CardTitle } from "@/components/ui/card";
import About from "./about";
import Bio from "./bio";
import Edit from "./edit";
import Services from "./services";
import HourSetting from "./schedule/hour-setting";
import Days from "./schedule/available-days";
import Note from "./schedule/note";

const ProfilePage = () => (
	<div className="w-full px-10 flex flex-col lg:flex-row justify-center gap-x-10">
		<div className="flex-1 lg:w-2/3 space-y-5">
			<About />
			<Edit />
			<Bio />
			<Services />
		</div>
		<div className="lg:w-1/3 h-full py-5 px-3 space-y-5 border border-hub-grey rounded-xl">
			<Card className="bg-transparent shadow-none border-t-0 border-x-0 border-b-2 rounded-none border-hub-grey space-y-2">
				<CardTitle className="text-xl">
					Set Your Appointment Availability
				</CardTitle>
				<CardContent className="px-0">
					Please set your available times for each day of the week.
					You can add multiple intervals for each day. Mark time slots
					as unavailable if you have pre-existing appointments.
				</CardContent>
			</Card>
			<Days />
			<HourSetting />
			<Note />
		</div>
	</div>
);

export default ProfilePage;
