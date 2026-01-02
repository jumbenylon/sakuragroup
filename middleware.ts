import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. SAFETY: Never block API routes or static files
  if (
    request.nextUrl.pathname.startsWith("/api") || 
    request.nextUrl.pathname.startsWith("/_next") || 
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Define protected routes
  const isPortalRoute = request.nextUrl.pathname.startsWith("/axis/portal");

  // 3. Check for the session cookie
  const hasSession = request.cookies.has("axis_session");

  // 4. Logic: Redirect unauthenticated users
  if (isPortalRoute && !hasSession) {
    const loginUrl = new URL("/axis/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Update matcher to be broader but safe-guarded by logic above
  matcher: ["/axis/portal/:path*", "/api/:path*"],
};
