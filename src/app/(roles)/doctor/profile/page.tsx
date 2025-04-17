import { redirect } from "next/navigation";
import { Routes } from "@/core/routing";
import { getSessionProfile } from "@/hooks/getSessionProfile";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ErrorFetchingProfile } from "../../chunks";
import About from "./about";
import Bio from "./bio";
import { ScheduleProvider } from "./context/Schedule";
import EditButton from "./edit-button";
import Days from "./schedule/days";
import Note from "./schedule/note";
import Time from "./schedule/time";
import Services from "./services";

const ProfilePage = async () => {
	const { isAuthenticated, profile } = await getSessionProfile();

	if (!isAuthenticated) redirect(Routes.AUTH.SIGN_IN.ROOT);
	if (!profile) return <ErrorFetchingProfile />;

	const {
		address,
		// dob,
		email,
		// emailVerified,
		// emergencyContact,
		firstname,
		// gender,
		// id,
		// language,
		// lastLogin,
		lastname,
		// notificationMode,
		// passwordRecoveryMode,
		phone
		// phoneVerified,
		// profileImage,
		// providerSpecialization,
		// rating
		// timezone,
		// type
	} = profile;

	return (
		<div className="w-full px-10 flex justify-center gap-x-10">
			<div className="flex-1 space-y-5">
				<About
					info={{
						firstname,
						lastname,
						phone,
						email,
						// profileImage,
						address
						// providerSpecialization,
						// rating
					}}
				/>
				<EditButton />
				<Bio />
				<Services />
			</div>
			<div className="w-[35%] h-full py-5 px-3 space-y-5 border border-hubGrey rounded-xl">
				<Card className="bg-transparent shadow-none border-t-0 border-x-0 border-b-2 rounded-none border-hubGrey space-y-2">
					<CardTitle className="text-xl">
						Set Your Appointment Availability
					</CardTitle>
					<CardContent className="px-0">
						Please set your available times for each day of the
						week. You can add multiple intervals for each day. Mark
						time slots as unavailable if you have pre-existing
						appointments.
					</CardContent>
				</Card>
				<ScheduleProvider>
					<Days />
					<Time />
				</ScheduleProvider>
				<Note />
			</div>
		</div>
	);
};

export default ProfilePage;
