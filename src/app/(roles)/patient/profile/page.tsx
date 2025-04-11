import { redirect } from "next/navigation";
import { ErrorFetchingProfile } from "../../chunks";
import About from "./about";
import Bio from "./bio";
import Contact from "./contact";
import EditButton from "./edit-button";
import Health from "./health";
import { getSessionProfile } from "@/hooks/getSessionProfile";
import { Routes } from "@/core/routing";

const ProfilePage = async () => {
	const { isAuthenticated, profile } = await getSessionProfile();

	if (!isAuthenticated) redirect(Routes.auth["sign-in"]);
	if (!profile) return <ErrorFetchingProfile />;

	const {
		address,
		// dob,
		email,
		// emailVerified,
		emergencyContact,
		firstname,
		// gender,
		// id,
		// language,
		// lastLogin,
		lastname,
		// maritalStatus,
		// notificationMode,
		// passwordRecoveryMode,
		phone,
		// phoneVerified,
		profileImage
		// pushNotificationEnabled,
		// timezone,
		// type
	} = profile;

	return (
		<div className="w-[90%] mx-auto space-y-5">
			<About
				info={{
					firstname,
					lastname,
					phone,
					email,
					profileImage,
					address
				}}
			/>
			<EditButton />
			<Bio />
			<Health />
			<Contact contactInfo={emergencyContact} />
		</div>
	);
};

export default ProfilePage;
