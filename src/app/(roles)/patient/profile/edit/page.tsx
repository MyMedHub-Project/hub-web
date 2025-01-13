import { auth } from "@/auth";
import EditForm from "./edit-form";
import { redirect } from "next/navigation";
import { getProfile } from "@/actions/profile-action";
import { Routes } from "@/core/routing";

const EditPage = async () => {
	const session = await auth();

	if (!session) {
		redirect(Routes.auth["sign-in"]);
	}

	const { user } = session;

	let profile = null;

	if (user) {
		profile = await getProfile(user.cat);
	}

	return <EditForm profile={profile} />;
};

export default EditPage;
