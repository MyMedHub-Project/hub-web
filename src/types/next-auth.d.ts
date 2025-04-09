import { UserTypes } from "@/constants/enums";
import "next-auth";

declare module "next-auth" {
	interface Session {
		loginVerified: boolean;
		user?: User;
	}

	interface User {
		id: string;
		type: UserTypes;
		firstname?: string;
		lastname?: string;
		email?: string;
		phone?: string;
		address: {
			city: string;
			country: string;
			state: string;
			street: string;
		};
		cat: string;
		refreshCat: string;
		twoFactor: { id: string; token: string } | null;
	}
}
