import { SessionProfile } from "../types/types";
import { getProfile } from "@/actions/profile-action";
import { getServerSession } from "@/hooks/getServerSession";

export async function getSessionProfile(): Promise<SessionProfile> {
	const resp: SessionProfile = {
		user: undefined,
		isAuthenticated: false,
		isLoading: false,
		profile: undefined
	};

	const session = await getServerSession();

	resp.user = session?.user;
	resp.isAuthenticated = session?.isAuthenticated;
	resp.isLoading = session?.isLoading;

	if (session.isAuthenticated && session?.user) {
		const profile = await getProfile(session.user.cat, session.user.type);
		resp.profile = profile;
	}

	return resp;
}
