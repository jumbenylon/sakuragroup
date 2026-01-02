import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. SAFETY ZONE: Always allow API calls and Static files
  // This ensures the login check endpoint (/api/auth/verify) is NEVER blocked
  if (
    path.startsWith("/api") || 
    path.startsWith("/_next") || 
    path.startsWith("/static") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Define Protected Zone
  const isPortalRoute = path.startsWith("/axis/portal");

  // 3. Check Permit
  const hasSession = request.cookies.has("axis_session");

  // 4. Gatekeeper Logic
  if (isPortalRoute && !hasSession) {
    // If trying to enter Portal without a session, send to Login
    const loginUrl = new URL("/axis/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/axis/portal/:path*", "/api/:path*"],
};
