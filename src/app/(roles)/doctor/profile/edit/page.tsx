import { redirect } from "next/navigation";
import { ErrorFetchingProfile } from "@/app/(roles)/chunks";
import { Routes } from "@/core/routing";
import { getSessionProfile } from "@/hooks/getSessionProfile";
import EditForm from "./edit-form";

const Edit = async () => {
	const { isAuthenticated, profile } = await getSessionProfile();

	if (!isAuthenticated) redirect(Routes.AUTH.SIGN_IN.ROOT);
	if (!profile) return <ErrorFetchingProfile />;

	return <EditForm profile={profile} />;
};

export default Edit;
