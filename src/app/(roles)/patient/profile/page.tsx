import { redirect } from "next/navigation";
// import { Session } from "next-auth";
import { auth } from "@/auth";
import { Routes } from "@/core/routing";
import { getProfile } from "@/actions/profile-action";
import About from "./about";
import Bio from "./bio";
import Contact from "./contact";
import EditButton from "./edit-button";
import Health from "./health";

const ProfilePage = async () => {
	// todo: fetch user profile here and pass it down to needing component. EMERGNECY CONTACT IS AVAILABLE ON PROFILE.
	const session = await auth();

	if (!session) {
		redirect(Routes.auth["sign-in"]);
	}

	const { user } = session;

	let profile = null;

	if (user) {
		profile = await getProfile(user.cat);
	}

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
