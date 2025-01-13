// next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user?: User;
	}

	interface User {
		id: string;
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
		twofactor: string | null;
	}
}
