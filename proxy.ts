// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Define routes that don't require authentication
  const publicPaths = [
    "/login",
    "/sign-up",
    "/verify-otp",
    "/pay",
    "/forgot-password",
    "/reset-password",
  ];

  // Allow if pathname is in publicPaths or starts with /pay/
  if (publicPaths.includes(pathname) || pathname.startsWith("/pay/")) {
    return NextResponse.next();
  }

  // If the token is not present, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the token is present, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
