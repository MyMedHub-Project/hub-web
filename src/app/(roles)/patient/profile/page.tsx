import { auth } from "@/auth";
import About from "./about";
import Bio from "./bio";
import Contact from "./contact";
import EditButton from "./edit-button";
import Health from "./health";
import { Routes } from "@/core/routing";
import { redirect } from "next/navigation";
import { getProfile } from "@/actions/profile-action";
import { Session } from "next-auth";

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
		id,
		type,
		firstname,
		lastname,
		email,
		emailVerified,
		phone,
		phoneVerified,
		address,
		gender,
		dob,
		maritalStatus,
		language,
		passwordRecoveryMode,
		emergencyContact,
		notificationMode,
		pushNotificationEnabled,
		lastLogin,
		profileImage,
		timezone
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
