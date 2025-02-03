import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { Routes } from "./core/routing";

export async function middleware(request: NextRequest) {
	if (request.method === "POST") {
		NextResponse.next();
	}

	const path = request.nextUrl.pathname;
	const session = await auth();

	if (!session) {
		return NextResponse.redirect(
			new URL(Routes.auth["sign-in"], request.url)
		);
	}

	if (path === "/") {
		const role = session.user?.type;

		if (!role) {
			return NextResponse.redirect(
				new URL(Routes.auth["sign-in"], request.url)
			);
		}

		switch (role) {
			case "patient":
				return NextResponse.redirect(new URL("/patient", request.url));
			case "institution_provider":
				return NextResponse.redirect(new URL("/doctor", request.url));
			default:
				//could redirect to error page or a default role page
				return NextResponse.redirect(
					new URL(Routes.auth["sign-in"], request.url)
				);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|auth|token|_next/static|_next/image|favicon.ico).*)",
		"/"
	]
};
