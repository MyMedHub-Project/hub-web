"use server";

import { signOut } from "@/auth";

export const handleSignOut = () => {
	signOut();
};
