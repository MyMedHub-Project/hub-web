"use server";

import { auth } from "@/auth";
import { UserSession } from "@/types/types";

export async function getServerSession(): Promise<UserSession> {
	const resp: UserSession = {
		session: null,
		user: undefined,
		isAuthenticated: false,
		isLoading: false
	};

	const session = await auth();

	resp.session = session;
	resp.isAuthenticated = !!session;
	resp.isLoading = false;
	resp.user = session?.user;

	return resp;
}
