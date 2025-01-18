import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	console.log(request.url);
	// if (request.url === "/") {
	// 	return NextResponse.redirect("/patient");
	// }
}

export const config = {
	// matcher: "/"
};
