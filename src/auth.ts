import NextAuth, { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import { Login, login } from "./actions/signIn";

/**
 * NextAuth Configuration
 */
export const { auth, handlers, signIn, signOut } = NextAuth({
	// Configure providers
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email Address", type: "text" },
				password: { label: "Password", type: "password" },
				data: {}
			},

			authorize: async (credentials) => {
				if (credentials?.data) {
					const data = JSON.parse(
						credentials.data as string
					) as Login.Response["data"];

					return {
						cat: data?.cat,
						refreshCat: data?.refreshCat,
						twoFactor: data?.twoFactor,
						...data?.user
					} as User;
				}

				const resp = await login({
					email: credentials.email as string,
					password: credentials.password as string
				});

				if (resp instanceof Error) return null;

				return {
					cat: resp?.cat,
					refreshCat: resp?.refreshCat,
					twoFactor: resp?.twoFactor,
					...resp?.user
				} as User;
			}
		})
	],

	// Configure callbacks
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
				token.loginVerified = !!user.cat;
			}
			return token;
		},

		// Set up session data from the token
		async session({ session, token }) {
			if (token.user) {
				session.user = token.user as AdapterUser & User;
				session.loginVerified = token.loginVerified as boolean;
			} else {
				console.warn("Token does not have a user field:", token);
			}
			return session;
		},

		// Determine if the request is authorized
		async authorized({ auth, request }) {
			if (auth) return true;

			// Allow POST requests (for login attempts)
			if (request.method === "POST") return true;

			return false;
		}
	},

	// Configure session handling
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 5 // 5 days
	},

	// Customize the sign-in page
	pages: { signIn: "/auth/sign-in" }
});
