"use client";

import { useSession } from "next-auth/react";
import { UserSession } from "@/types/types";

export function useClientSession(): UserSession {
	const resp: UserSession = {
		session: null,
		user: undefined,
		isAuthenticated: false,
		isLoading: false
	};

	const { data: session, status } = useSession();

	resp.session = session;
	resp.isAuthenticated = status === "authenticated";
	resp.isLoading = status === "loading";
	resp.user = session?.user;

	return resp;
}
