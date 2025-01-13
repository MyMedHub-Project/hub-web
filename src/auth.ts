import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { retrieveUser } from "./actions/auth-action";
import { AdapterUser } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email Address", type: "text" },
				password: { label: "Password", type: "password" }
			},
			authorize: async (credentials, request) => {
				const user = await retrieveUser(
					credentials.email as string,
					credentials.password as string
				);

				return user;
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}

			return token;
		},
		async session({ session, token }) {
			if (token.user) {
				session.user = token.user as AdapterUser & User;
			} else {
				console.warn("Token does not have a user field:", token);
			}

			return session;
		},
		async authorized({ request, auth }) {
			if (auth) {
				return true;
			}

			if (request.method === "POST") {
				return true;
			}

			return false;
		}
	},
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 5 // 5days
	},
	pages: {
		signIn: "/auth/sign-in"
	}
});
