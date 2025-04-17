import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { routeMappings } from "./core/route-maping";
import { Routes } from "./core/routing";

// Public paths that don't require authentication
const PUBLIC_PATHS = ["/auth", "/api", "/_next", "/favicon.ico"];

// Helper function to check if the path is public
const isPublicPath = (path: string) =>
	PUBLIC_PATHS.some((publicPath) => path.startsWith(publicPath));

export const middleware = async (request: NextRequest) => {
	// Allow POST requests to pass through
	if (request.method === "POST") return NextResponse.next();

	const path = request.nextUrl.pathname;

	// Redirect root path
	if (path === "/") {
		return NextResponse.redirect(
			new URL(Routes.DASHBOARD.ROOT, request.url)
		);
	}

	// Handle invalid paths
	if (path.startsWith("sections")) {
		return NextResponse.rewrite(new URL(Routes.NOT_FOUND, request.url));
	}

	// If the path is public, skip authentication
	if (isPublicPath(path)) return NextResponse.next();

	// Authenticate the user
	const session = await auth();

	// If it is an auth path and there is no session, allow the request to pass
	if (!session && path.includes("auth")) return NextResponse.next();

	// If there is no session, redirect to sign-in page
	if (!session) {
		// Redirect to sign-in page
		return NextResponse.redirect(
			new URL(Routes.AUTH.SIGN_IN.ROOT, request.url)
		);
	}

	// If there is a session, get the role
	const role = session?.user?.type;

	// If it is an auth path and there is no role, allow the request to pass
	if (!role && path.includes("auth")) return NextResponse.next();

	// If there is no role, redirect to sign-in page
	if (!role) {
		return NextResponse.redirect(
			new URL(Routes.AUTH.SIGN_IN.ROOT, request.url)
		);
	}

	// Get the current path
	const pathSegments = path.split("/").filter(Boolean);
	if (pathSegments.length < 1) return NextResponse.next();
	const currentPath = pathSegments[0];

	// Get the paths available for the role
	const rolePaths = routeMappings[role];
	if (!rolePaths) return NextResponse.next();

	// Get the valid paths for the role
	const validPaths = Object.keys(rolePaths);

	// Check if the current path is valid
	const isValidPath = validPaths.includes(currentPath);
	if (!isValidPath) return NextResponse.next();

	// Get the path for the role
	const rolePath = rolePaths[currentPath];
	if (!rolePath) return NextResponse.next();

	// Construct the new path by replacing the first segment
	const newPath = `${rolePath}${pathSegments.length > 1 ? `/${pathSegments.slice(1).join("/")}` : ""}`;

	// Rewrite the path
	return NextResponse.rewrite(new URL(newPath, request.url));
};

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"]
};
