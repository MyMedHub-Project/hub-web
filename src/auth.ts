import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";
import { retrieveUser } from "./actions/auth-action";

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email Address", type: "text" },
				password: { label: "Password", type: "password" },
				data: {}
			},
			authorize: async (credentials) => {
				const user = await retrieveUser(
					credentials.email as string,
					credentials.password as string,
					credentials.data
				);

				return user;
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
				token.loginVerified = !!user.cat;
			}

			return token;
		},
		async session({ session, token }) {
			if (token.user) {
				session.user = token.user as AdapterUser & User;
				session.loginVerified = token.loginVerified as boolean;
			} else {
				console.warn("Token does not have a user field:", token);
			}

			return session;
		},
		async authorized({ auth, request }) {
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
	pages: { signIn: "/auth/sign-in" }
});
