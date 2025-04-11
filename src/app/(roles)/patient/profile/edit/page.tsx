import { redirect } from "next/navigation";
import EditForm from "./edit-form";
import { ErrorFetchingProfile } from "@/app/(roles)/chunks";
import { Routes } from "@/core/routing";
import { getSessionProfile } from "@/hooks/getSessionProfile";

const EditPage = async () => {
	const { isAuthenticated, profile } = await getSessionProfile();

	if (!isAuthenticated) redirect(Routes.auth["sign-in"]);
	if (!profile) return <ErrorFetchingProfile />;

	return <EditForm profile={profile} />;
};

export default EditPage;
