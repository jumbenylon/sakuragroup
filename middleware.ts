import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Define protected routes
  const isPortalRoute = request.nextUrl.pathname.startsWith("/axis/portal");

  // 2. Check for the session cookie
  const hasSession = request.cookies.has("axis_session");

  // 3. Logic: If trying to access Portal WITHOUT session -> Redirect to Login
  if (isPortalRoute && !hasSession) {
    const loginUrl = new URL("/axis/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Optimization: Only run on specific paths
export const config = {
  matcher: ["/axis/portal/:path*"],
};
