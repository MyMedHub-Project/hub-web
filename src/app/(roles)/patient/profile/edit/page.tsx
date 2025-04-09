import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProfile } from "@/actions/profile-action";
import { Routes } from "@/core/routing";
import { ErrorFetchingProfile } from "@/app/(roles)/chunks";
import EditForm from "./edit-form";

const EditPage = async () => {
	const session = await auth();

	if (!session) {
		redirect(Routes.auth["sign-in"]);
	}

	const { user } = session;

	let profile = null;

	if (user) {
		profile = await getProfile(user.cat, user.type);
	}

	if (!profile) {
		return <ErrorFetchingProfile />;
	}

	return <EditForm profile={profile} />;
};

export default EditPage;
