import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
	"/login",
	"/sign-up",
	"/verify-otp",
	"/forgot-password",
	"/reset-password",
];

export function proxy(request: NextRequest) {
	const token = request.cookies.get("auth_token")?.value;
	const { pathname } = request.nextUrl;
	const isPublicPath =
		PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/pay/");

	if (isPublicPath || token) {
		return NextResponse.next();
	}

	return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
	],
};
