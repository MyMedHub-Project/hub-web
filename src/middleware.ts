import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./auth";
import { Routes } from "./core/routing";

export const middleware = async (request: NextRequest) => {
	if (request.method === "POST") {
		NextResponse.next();
	}

	const path = request.nextUrl.pathname;
	const session = await auth();
	// const verificationData = request.cookies.get("verificationData");
	// console.log(verificationData);

	if (!session && !path.includes("auth")) {
		return NextResponse.redirect(
			new URL(Routes.auth["sign-in"], request.url)
		);
	}

	// if (path.includes("onboarding/") && !verificationData) {
	// 	return NextResponse.redirect(new URL(Routes.onboarding, request.url));
	// }

	if (path === "/") {
		const role = session?.user?.type;

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

	NextResponse.next();
};

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"]
};
