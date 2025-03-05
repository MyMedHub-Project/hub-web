import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./auth";
import { Routes } from "./core/routing";
import { routeMappings } from "./core/route-maping";

export const middleware = async (request: NextRequest) => {
	if (request.method === "POST") {
		return NextResponse.next();
	}

	const session = await auth();
	const path = request.nextUrl.pathname;

	if (path === "/") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (path.startsWith("sections")) {
		return NextResponse.rewrite(new URL("/404", request.url));
	}

	if (!session) {
		if (path.includes("auth")) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(
				new URL(Routes.auth["sign-in"], request.url)
			);
		}
	}

	const role = session?.user?.type;
	if (!role) {
		if (path.includes("auth")) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(
				new URL(Routes.auth["sign-in"], request.url)
			);
		}
	}

	// New Role-Based Dynamic Routing Logic
	const pathSegments = path.split("/").filter(Boolean);
	const roleMapping =
		routeMappings[
			role as "patient" | "institution_provider" | "institution"
		];
	const validRoutes = Object.keys(roleMapping);

	if (pathSegments.length >= 1 && validRoutes.includes(pathSegments[0])) {
		if (roleMapping && roleMapping[pathSegments[0]]) {
			// Construct the new path by replacing the first segment
			const newPath = `${roleMapping[pathSegments[0]]}${pathSegments.length > 1 ? `/${pathSegments.slice(1).join("/")}` : ""}`;

			return NextResponse.rewrite(new URL(newPath, request.url));
		}
	}

	return NextResponse.next();
};

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"]
};
