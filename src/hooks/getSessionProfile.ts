"use server";

import { getProfile } from "@/actions/getProfile";
import { getServerSession } from "@/hooks/getServerSession";
import { SessionProfile } from "../types/types";

export async function getSessionProfile(): Promise<SessionProfile> {
	const resp: SessionProfile = {
		session: null,
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
		const profileResponse = await getProfile({
			cat: session.user.cat || "",
			role: session.user.type
		});

		if (profileResponse instanceof Error) {
			console.error(profileResponse);
		}

		if (!(profileResponse instanceof Error)) {
			resp.profile = profileResponse;
		}
	}

	return resp;
}
