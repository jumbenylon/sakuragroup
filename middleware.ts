import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // 🚨 THE FIX: 
  // We explicitly tell NextAuth to look for the '__Secure-' cookie when in production.
  // Without this, Cloud Run (which sees the request as HTTP) looks for the wrong cookie and fails.
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production" 
  });

  const { pathname } = request.nextUrl;

  // 1. PUBLIC ROUTES & ASSETS (Allow everyone)
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/axis/login") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // Files like images, favicon, etc.
  ) {
    return NextResponse.next();
  }

  // 2. PROTECTED ROUTES (Require Token)
  // Identify if the user is trying to access a secure area
  const isAuthPath = pathname.startsWith("/axis/portal") || 
                     pathname.startsWith("/axis/admin") ||
                     pathname.startsWith("/admin");

  if (isAuthPath && !token) {
    // If no token, redirect to login and remember where they were going
    const loginUrl = new URL("/axis/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. ADMIN ROLE PROTECTION (Require 'ADMIN' role)
  // If a regular user tries to access admin areas, bounce them to the portal
  if ((pathname.startsWith("/admin") || pathname.startsWith("/axis/admin")) && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/axis/portal", request.url));
  }

  // 4. DEFAULT: Allow request to proceed
  return NextResponse.next();
}

export const config = {
  // Run this middleware on specific paths to save resources
  matcher: [
    "/axis/:path*", 
    "/admin/:path*",
    // Negative lookahead: Exclude api/auth, static files, and images from running middleware logic
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)"
  ],
};
